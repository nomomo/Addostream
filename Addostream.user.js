// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1.35
// @updateURL   https://github.com/nomomo/Addostream/raw/master/Addostream.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==


var ADD_DEBUG_MODE = false;
var version = GM_info.script.version;


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                               Jquery Library
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


// noConflict option
this.J$ = this.jQuery = jQuery.noConflict(true);

/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.Jcookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.Jcookie(b)?!1:(a.Jcookie(b,"",a.extend({},c,{expires:-1})),!a.Jcookie(b))}});

/*! jquery browser | http://jquery.thewikies.com/browser/  MIT */
(function(J$){J$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=(J$.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();J$.browser=J$.extend((!z)?J$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|J$)/));J$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);J$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){J$('html').addClass([J$.os.name,J$.browser.name,J$.browser.className,J$.layout.name,J$.layout.className].join(' '));}};J$.browserTest(navigator.userAgent);})(jQuery);

var web_browser = J$.browser.name;


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                      CSS
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


function Addostream_CSS()
{
J$('head').append('\
    <style id="addostreamCSS" rel="stylesheet" type="text/css">\
        .search a.afreeca{display:none !important;}\
         ul.nav{display:none !important;}\
         #streamSearchForm{display:none !important;}\
        .onstream .nav-brand_mod{height:45px;text-decoration:none;color:#fff;}\
        .nav-brand_mod{display:block;float:left;width:112px;height:63px;margin:0 20px 0 24.5px;background-position:center center;background-repeat:no-repeat;}\
        .nav-brand, .nav-brand_mod{color:#fff;overflow:visible;margin-left:24.5px;background-image:url(" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAAsTAAALEwEAmpwYAAA752lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wNy0yOVQwMjoxMToxMCswOTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZDZlNmM5ZDctYTQ5NS0yYjQ4LWFkNTQtODk4Y2YxOGYxNmNiPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YjljODIzOTYtNzNiNy0xMWU3LTgxMzItZWJiZTQwMzI0ZjNkPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Y2MwYjBiN2MtYTYwYi1hMzQ3LWE3MWItZGUxZWU1MzYyZGQ1PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wNy0yOVQwMjoxMToxMCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkNmU2YzlkNy1hNDk1LTJiNDgtYWQ1NC04OThjZjE4ZjE2Y2I8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+KzwvcGhvdG9zaG9wOkxheWVyTmFtZT4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllclRleHQ+KzwvcGhvdG9zaG9wOkxheWVyVGV4dD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6VGV4dExheWVycz4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDpDRDkwODM0Mjk1NTIxMUUzODk3REU5MTEyMTdENDYzOTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+OTE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTM8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pvkq298AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA9FJREFUeNrsWD2u2zgQ/rTIBbJQ8zphF3idKrHhBQw3OoCqwI0rqfIBBPdW5e41Qir1VmP4AmxYWd0DduHuFRaQI0wKkhb1Q8kIEiywCAEWIoczw/n5ZkSPiAAATcFoU8E5eH7GMfY9/B4/Poiom9cDRVFKpztRb/1+ojSKKIoOdKXB3k+c91NK0eH6y/j/1/MP2/Dt7QYgQOAPPOLH3vGcg6PCpmh+jdfbmvZ7gWQV/i+CmDEmGWOf7bWesT/ehfu0H3vbBEB1QQNQb68piDFmzYJGNG1NWY+GEctqatFSnTFi6z0EgGrDYPNoCkOfUd3a3wMZQ/5FQ8MrdGfVzOqaCot2KKt/L71m9NXrRQNyWCwC8NkBI3c6pRFF6YnuDqi4n9IRzFwP0WBN87EhR8OQQgjrnAUZivc0TKm9iCLN435Ke3qO9LoeHrRLOkUDvWxZDxmaNk1tOfP20jz+csDIB94FgCCAD8wUQoH3jy6iNxVHfj4i9s0Z34tzBTlvdauCTlwgkGAOIeayyuwlpcQuHOjWFLTeC/A873R4eQXv0XzFXnDk5x1Cczc/9vKcA+B4fZnQIykhj7Fn20KIAKW07zoJHcQYM9H+j/39adR12JKn+xKtXEv1WwXwHNx/BsUqXJodQm3wcCc92WEA3W4A+Cte3O0QvoQG0Y6ejLUdLxUBCbaxb9l2D4EE2/AZPe0aZfTIcd6FtgcgACSl5SwTnEkXnFJKZhmeAPwtpfx3jNntDbcFcymvG+WUML7iC5kA+PEWyQOPDfb1OM9klTbA5F5DlwpAslJG0Birss0Yxs3bmU0DWtU49DPg+eCcKpDae0HgClN9MRN9TzinG6G3k9KTskQCgf2aYaqAOVwMJ8IYHaqNKqoboJQSUh69R6prmrFRprJJB9CkAQdd2vL9v+k5Nvac91Sxf0MFINnGi5GsMJpjNcpbZfRzzoHqDY8IdxpkYc/64ZJSelLuvHBBt9kodhhwMgMWglNK+aeUctrYfYiY7oGRlF2B8gMEAMSjWnYRIy4C4CuFkU2hW7wOOvwgeF7xuT2nDsujKdbYD6N4UtZcPXEH5wyMuBk2he6BkxJyF3p2lK4UEMPuNdUlOPJcZYDKmL4zVMFajQrW7dYuFOUxPCkdrCwB0NZZ1//6HCsOiIuAcrjqk83TxNiJQ1nTmO/8AZwZHl0PxOYfRXA+uqFj9KYyoG/rjNZ7scCzpTpTkWZGUkqsLgx91RKU0u4Ips8CCfLzF8S+fstpa8r0T9PjnYcLmDWen7F9X/dlmeDqnTXyW9gyJ1vSifF9AJJYNd1acLVBAAAAAElFTkSuQmCC") !important}\
        .nav-brand:hover, .nav-brand:visited, .nav-brand:active, .nav-brand_mod:hover, .nav-brand_mod:visited, .nav-brand_mod:active {text-decoration:none;color:#fff;}\
        .onstream .AD_title{height:45px;padding:7px 0}\
        .AD_title {position:absolute; top:0; right:10px; height:63px; padding:16px 0; font-size:11px; font-style:italic; color:#999}\
        .icon_star{position:absolute !important;top:10px; right:25px; z-index:10;}\
        .icon_pushpin{position:absolute !important;top:10px; right:10px; z-index:50;}\
        #ADD_config {cursor:pointer; padding-right:10px;}\
        #ADD_test_button {cursor:pointer;}\
        #popup_ADD_config, #popup_ADD_quick, #popup_ADD_test {display:none; font-size:12px; z-index:10000; position:absolute; width:500px;}\
        #popup_ADD_config{ top:50px; right:10px; }\
        #ADD_quick_list { opacity:0; transition: visibility 0s, opacity 0.5s linear;}\
        .onstream #ADD_quick_list { opacity:1; display:inline-block;}\
        #popup_ADD_quick .modal-body{ padding:15px; }\
        #popup_ADD_quick { top:50px; right:10px; }\
        #popup_ADD_quick .quick_list_title { padding:0 5px 2px 5px; margin-bottom:0px; border-bottom:2px solid rgb(221, 221, 221); font-weight:bold;}\
        #popup_ADD_quick ul { list-style:none; margin:0;padding:0;display:block;font-size:11px;}\
        #popup_ADD_quick li { border-bottom:1px solid #eee; display:block;}\
        #popup_ADD_quick a { padding:5px 5px 5px 5px; display:block;color:#333;text-decoration:none;}\
        #popup_ADD_quick li>a:hover { background-color:#d3d3d3;}\
        #popup_ADD_quick img { float:left;display:block;width:60px;height:30px;vertical-align:middle;border:0; margin-right:10px;}\
        #popup_ADD_quick .title {overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:40px;color:#222}\
        #popup_ADD_quick .info {}\
        #popup_ADD_quick .from {float:left;color:#666;}\
        //#popup_ADD_quick .info .twitch {color:#9B59B6;}\
        //#popup_ADD_quick .info .kakao {color:#999900;} //fae100\
        //#popup_ADD_quick .info .youtube {color:#e74c3c;}\
        #popup_ADD_quick .viewers { text-align: right; color: #7d7d7b;}\
        #popup_ADD_quick .ADD_checkbox {display:none;}\
        #popup_ADD_quick .ADD_li_box {right:45px;top:-27px;height:10px;font-size:10px;}\
        #popup_ADD_quick .ADD_li_box .btn {font-size:9px;padding:1px 2px;letter-spacing:-0.5px; border:0; opacity:0.7;border-radius:0px;}\
        #popup_ADD_quick .icon_star{top:7px; right:15px; z-index:10;}\
        #popup_ADD_quick .icon_pushpin{top:7px; right:5px; z-index:50;}\
        #popup_ADD_quick .ADD_thumb_elem{left:70px;}\
        #popup_ADD_quick .ADD_thumb_elem{width:290px; height:163px; !important;}\
        #popup_ADD_test{ top:50px; right:10px; }\
        .modal-content {\
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\
            background-clip: padding-box;\
            background-color: #fff;\
            border: 1px solid rgba(0, 0, 0, 0.2);\
            border-radius: 6px;\
            outline: 0 none;\
        }\
        .modal-content {opacity:0.93}\
        .modal-body {\
            padding: 15px 15px 5px 15px;\
        }\
        .modal-footer {\
            border-top: 1px solid #e5e5e5;\
            padding: 10px 15px;\
            text-align: right;\
        }\
        #ADD_config_Success {font-size:11px;}\
        .btn {\
            font-size: 12px;\
        }\
        .main-streams>ul>li>a{padding: 10px 5px 10px 15px !important;}\
        .ADD_li_box_container{position:relative;}\
        .ADD_li_box{position:absolute; top:-42px; right:70px; height:30px; vertical-align:middle; text-align:center; font-size:12px; z-index:100; margin:0;}\
        .ADD_li_box:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}\
        .ADD_checkbox_container{display:inline-block;line-height:100%;vertical-align:middle; }\
        .ADD_checkbox{width:20px;height:20px;margin:1px 2px 1px 0 !important;border:none !important;}\
        .multitwitch_button{vertical-align:middle;display:inline-block;} //background-color:#eee; padding:5px 8px; height:26px; \
        .form_disabled {color:#888;}\
        .form_enabled {color:#222;}\
        #popup_ADD_config table td {height:25px; font-size:11px; padding:2px 5px 2px 10px; vertical-align:middle;}\
        #popup_ADD_config table td label{vertical-align:middle; margin-bottom:0px;}\
        #popup_ADD_config table td input[type="text"]{font-size:11px;}\
        #popup_ADD_config table td input[type="checkbox"]{vertical-align:middle; margin-bottom:0; margin-top:0;}\
        #popup_ADD_config table td input[type="radio"]{vertical-align:middle; margin-bottom:0; margin-top:0;}\
        #popup_ADD_config table td:nth-child(1) {width:300px;}\
        #popup_ADD_config table td:nth-child(2) {width:200px;}\
        #popup_ADD_config table td .tooltip_container{float:right;}\
        .btn-success {margin-right: 10px;}\
        .btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open .dropdown-toggle.btn-success {\
            background-color: #5cb85c;\
            border-color: #4cae4c;\
            color: #fff;\
            cursor: Default;\
            margin-right: 10px;\
        }\
        .confirm_selection {\
            animation: glow .5s infinite alternate;\
        }\
        @keyframes glow {\
            to {\
                text-shadow: 0 0 10px white;\
                box-shadow: 0 0 10px #5cb85c;\
            }\
        }\
       .multitwitch_ready {\
            animation: glow2 0.5s 4 alternate;\
        }\
        @keyframes glow2 {\
            to {\
                text-shadow: 0 0 10px white;\
                box-shadow: 0 0 10px #6441A4;\
            }\
        }\
        .fixed_streamer{background-color:#f5f5f5;}\
        .td_strong{font-weight:bold;}\
        #notice_text_elem{display:none;font-size:10px;color:#666;position:absolute;top:9px;right:100px;width:300px;height:30px;text-align:right; vertical-align:middle;}\
        #notice_text_elem:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}\
        #notice_text{display:inline-block;vertical-align:middle;line-height:150%;}\
        #at {\
            cursor:pointer;display:inline-block;margin:4px 2px 0 2px;height:24px;\
            animation-name: at_spin;\
            animation-duration: 18s;\
            animation-iteration-count: infinite;\
            animation-timing-function: linear;\
        }\
        @keyframes at_spin {\
            0% {transform: rotate(0deg);}\
            25% {transform: rotate(90deg);text-shadow: 0 0 3px #F0F8FF;}\
            50% {transform: rotate(180deg);text-shadow: 0 0 8px #B0E0E6;}\
            100% {transform: rotate(359deg);}\
        }\
        .ADD_under_dev {display:none;}\
        .imgur_container {position:relative;}\
        .imgur_safe_screen {display:inline-flex;align-items:center;position:absolute;top:0;left:0;text-align:center;vertical-align:middle;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;}\
        .imgur_control_button_container{position:relative;}\
        .imgur_control_button{position:absolute;width:60px;height:20px;text-align:right;}\
        .ADD_tr_10_10{top:10px;right:10px;}\
        .ADD_br_10_10{bottom:10px;right:10px;}\
        .imgur_control_button span{font-size:20px; display:inline-block;opacity:0.5;cursor:pointer;}\
        .imgur_safe_button {opacity:1.0;color:rgba(0, 0, 0, 1.0);line-height:200%;margin:0 auto;text-align:center;vertical-align:middle;cursor:pointer;color:black;font-size:12px;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}\
        .imgur_image_in_chat {max-width:320px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;}\
        .lightbox-opened img{max-width: 100%;}\
        .lightbox-opened {\
          z-index: 100000;\
          background-color: rgba(51,51,51,0.8);\
          //opacity:0.8;\
          cursor: pointer;\
          height: 100%;\
          left: 0;\
          overflow-y: scroll;\
          padding: 24px;\
          position: fixed;\
          text-align: center;\
          top: 0;\
          width: 100%;\
          &:before {\
            background-color: rgba(51,51,51,0.8);\
            //opacity:0.8;\
            color: #eee;\
            content: "x";\
            font-family: sans-serif;\
            padding: 6px 12px;\
            position: fixed;\
            text-transform: uppercase;\
          }\
          img {box-shadow: 0 0 6px 3px #333; opacity:1.0;}\
        }\
        .no-scroll {overflow: hidden;}\
        #ADD_send_location_container {position:absolute;bottom:55px;right:10px;z-index:10;vertical-align:middle;}\
        #ADD_send_location_notice {display:none;width:60px;height:24px;font-size:10px;color:#333;background-color:#f5f5f5;}\
        #ADD_send_location_button {width:24px;height:24px;font-size:18px;cursor:pointer;}\
        div.ADD_thumb_elem_container{position:relative;display:none;}\
        div.ADD_thumb_elem_container div.ADD_thumb_elem{position:absolute;top:0px;left:105px;z-index:300;}\
        div.ADD_thumb_elem_container img.ADD_thumb_img{z-index:400;}\
        div.ADD_thumb_elem_container div.ADD_thumb_size_0{width:240px;height:180px;}\
        div.ADD_thumb_elem_container div.ADD_thumb_size_1{width:20vw;height:calc(20vw / 16 * 9);}\
        div.ADD_thumb_elem_container div.ADD_thumb_size_2{width:30vw;height:calc(30vw / 16 * 9);}\
        div.ADD_thumb_elem_container div.ADD_thumb_size_3{width:40vw;height:calc(40vw / 16 * 9);}\
        div.ADD_thumb_elem_container div.ADD_thumb_elem::before{\
          content: "";\
          position: absolute;\
          left: 0;\
          right: 0;\
          top: 0;\
          bottom: 0;\
          margin:auto;\
          width: 60px;\
          height: 60px;\
          animation: ADD_180_rotate 0.8s infinite linear;\
          border: 8px solid #333;\
          border-right-color: transparent;\
          border-radius: 50%;\
          z-index:-1;\
        }\
        .loader_container{position:relative;width:100%;height:100%;}\
        .loader {\
            position:absolute;\
            top:0;\
            bottom:0;\
            right:-20px;\
            margin:auto 0;\
            border: 2px solid #f3f3f3;\
            border-top: 2px solid #666;\
            border-radius: 50%;\
            width: 20px;\
            height: 20px;\
            animation: ADD_180_rotate 0.8s cubic-bezier(0.4, 0, 1, 1) infinite;\
        }\
        @keyframes ADD_180_rotate {\
          0%    { transform: rotate(0deg); }\
          100%  { transform: rotate(360deg); }\
        }\
        #view_additional_message_container {position:absolute;bottom:46px;left:0px;z-index:15;width:100%; height:30px;cursor:pointer;}\
        #view_additional_message {position:relative;padding:5px 0;background-color:rgba(0,0,0,0.6);text-align:center;color:#fff;font-size:12px;}\
    </style>\
');

/*
가변너비
@media (min-width: 1550px)
.container {
    width: 1170px;
}
@media (min-width: 1200px)
.container {
    width: 800px;
}
*/
    // console.log('css');
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                             HIJACKED FUNCTION
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 파싱 후 데이터 정리
function parse_data_from_list(flag)
{
    J$.getJSON("/dev/stream_list.php", function(data) {
        
    
        // 숨길 대상 스트리머 지우기
        var h_index_ary = [];
        for(var i=0; i<hide_streamer.length; i++)
        {
            var h_index = data.map(function(o) { return o.streamer; }).indexOf(hide_streamer[i]);
            
            if(h_index !== -1)
            {
                h_index_ary.push(h_index);
            }
        }
        h_index_ary.sort(function(a, b) { // 내림차순
            return b - a;
        });
        
        
        for(var i=0; i<h_index_ary.length; i++)
        {
            // 저장된 index가 내림차순이므로 마지막에서부터 지운다.
            data.splice(h_index_ary[i],1);
        }
        
        // 17-09-19 : 아프리카를 메인에서 숨긴다.
        for( var i=data.length - 1; i>0 ; i-- )
        {
            if( data[i].from == 'afreeca' )
            {
                data.splice(i,1);
            }
        }

        // 새로 추가한 항목 초기화
        for( var i=0; i<data.length ; i++ )
        {
            data[i].main_fixed = false;
            data[i].main_favorite = false;
            data[i].display_name = '';
        }
        
        
        // Twitch api 쿠키로부터 스트리머 가져오기
        ADD_DEBUG_MODE && console.log('ADD_config_ary.ADD_config_alarm :',ADD_config_ary.ADD_config_alarm);
        if ( ADD_config_ary.ADD_config_alarm && (!!J$.Jcookie('twitch_api_cookie')) )
        {
            ADD_DEBUG_MODE && console.log('...twitch_api_cookie 쿠키 정리 중...');
            // 로컬 변수 선언
            var temp_api_cookie = JSON.parse(J$.Jcookie('twitch_api_cookie'));

            if(temp_api_cookie === undefined || temp_api_cookie === null || temp_api_cookie.length === 0)
            {
                ADD_DEBUG_MODE && console.log('twitch_api_cookie 쿠키 확인 실패', temp_api_cookie);
            }
            else
            {
                for( var i=0; i<temp_api_cookie.length ; i++ )
                {
                    var t_index = data.map(function(o) { return o.streamer; }).indexOf(temp_api_cookie[i].name);
                        if(t_index !== -1)
                        {
                            data[t_index].title = temp_api_cookie[i].status;
                            data[t_index].viewers = temp_api_cookie[i].viewers;
                            data[t_index].display_name = temp_api_cookie[i].display_name;
                            data[t_index].main_favorite = true;

                            data.splice(0, 0, data.splice(t_index, 1)[0]);
                        }
                        else
                        {
                            var temp_one = {};

                            temp_one.title = temp_api_cookie[i].status;
                            temp_one.from = 'twitch';
                            temp_one.url = '/twitch/'+temp_api_cookie[i].name;
                            temp_one.image = 'http://static-cdn.jtvnw.net/previews-ttv/live_user_'+temp_api_cookie[i].name+'-240x180.jpg';
                            temp_one.streamer = temp_api_cookie[i].name;
                            temp_one.viewers = temp_api_cookie[i].viewers;
                            temp_one.display_name = temp_api_cookie[i].display_name;
                            temp_one.main_fixed = false;
                            temp_one.main_favorite = true;

                            data.unshift(temp_one);
                            temp_one = null;
                        }
                }
            }
            
            // GC
            temp_api_cookie = null;
            ADD_DEBUG_MODE && console.log('...twitch_api_cookie 쿠키 정리 완료...');
        }
        
        
        // 고정 시킬 스트리머 순서 맨 위로 올리기
        ADD_DEBUG_MODE && console.log('ADD_config_ary.ADD_config_top_fix :',ADD_config_ary.ADD_config_top_fix);
        if(ADD_config_ary.ADD_config_top_fix)
        {
            for(var i=fixed_streamer.length-1; i>=0; i--)
            {
                var f_index = data.map(function(o) { return o.streamer; }).indexOf(fixed_streamer[i]);
                if(f_index !== -1)
                {
                    data[f_index].main_fixed = true;
                    data.splice(0, 0, data.splice(f_index, 1)[0]);
                }
                else if(ADD_config_ary.ADD_config_top_off_fix)
                {
                    var temp_one = {};

                    if( ADD_config_ary.ADD_config_alarm && (!!J$.Jcookie('twitch_api_cookie')) && (J$.inArray(fixed_streamer[i],alarm_streamer) !== -1) )
                        temp_one.title = '스트림이 오프라인 상태입니다.';
                    else
                        temp_one.title = '스트림이 오프라인 상태이거나 메인에 없는 스트리머 추가 목록에 없습니다.';

                    temp_one.from = 'twitch';
                    temp_one.url = '/twitch/'+fixed_streamer[i];
                    temp_one.image = 'http://static-cdn.jtvnw.net/previews-ttv/live_user_'+fixed_streamer[i].name+'-240x180.jpg';
                    temp_one.streamer = fixed_streamer[i];
                    temp_one.viewers = 0;
                    temp_one.display_name = '';
                    temp_one.main_fixed = true;
                    temp_one.main_favorite = false;

                    data.unshift(temp_one);

                    // GC
                    temp_one = null;
                }
            }
        }


        // display_name 채우기
        for( var i=0; i<data.length ; i++ )
        {
            if(data[i].main_favorite === true)
                continue;
    
            for(var j=0; j<streamerArray.length; j++)
            {
                if(data[i].from !== 'twitch')
                {
                    data[i].display_name = '';
                    break;
                }
                
                if(streamerArray[j][0] === data[i].streamer)
                {
                    data[i].display_name = streamerArray[j][1];
                    break;
                }
                
                if(j === streamerArray.length-1)
                {
                    data[i].display_name = data[i].streamer;
                    break;
                }
            }
        }

        ADD_run(data,flag);
    
    });
}


//////////////////////////////////////////////////////////////////////////////////
// 파싱 데이터 이용하여 DOE 생성
function ADD_run(json,flag) {
	var append = '';
	ADD_DEBUG_MODE && console.log('ADD_run 실행됨!');
	//console.log('json :',json);
	J$(json).each(function(k, data) {
  	  var twitch_append = '';
  	  var fixed_class = '';
  	  var fixed_append = '';
  	  var favorite_class = '';
  	  var favorite_append = '';
  	  var display_name = '';
  	  
      if(data.from === 'twitch')
      {
          twitch_append='\
              <div class="ADD_li_box_container">\
                  <div class="ADD_li_box">\
                      <div class="ADD_checkbox_container">\
                          <input class="ADD_checkbox" type="checkbox" name="chk" value="'+data.streamer+'" onfocus="this.blur()" />\
                      </div>\
                      <div class="multitwitch_button">\
                          <a href="/#/stream/multitwitch/'+data.streamer+'">\
                              <span class="btn btn-default btn-xs">With chat</span>\
                          </a>\
                      </div>\
                  </div>\
              </div>\
          ';
  
          display_name = data.display_name+' ('+data.streamer+')';
      }
      else
      {
        	switch(data.from) {
          		case 'afreeca':
          		  	display_name = '아프리카';
          		  	break;
          		case 'kakao':
          		  	display_name = '카카오';
          		  	break;
          		case 'youtube':
          		  	display_name = '유투브';
          		  	break;
          		default:
          		  	display_name = from;
        	}
      }
      
      if(data.main_fixed)
      {
          fixed_class = ' fixed_streamer'
          fixed_append = '<div style="position:relative;"><div class="glyphicon glyphicon-pushpin icon_pushpin"></div></div>';
      }
      if(data.main_favorite)
      {
          favorite_class = ' favorite_streamer';
          favorite_append = '<div style="position:relative;color:#333;"><div class="glyphicon glyphicon-star icon_star"></div></div>';
      }
  		append += '\
  		    <li id="twitch_'+data.streamer+'" class="'+data.from+fixed_class+favorite_class+'">\
  		        '+fixed_append+favorite_append+'\
              <a href="/#/stream'+data.url+'">\
                  <img src="'+data.image+'" width="90" hieght="60">\
                  <div class="stream-wrap">\
                      <div class="title">'+(data.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"))+'</div>\
                      <div class="info">\
                          <div class="from '+data.from+'">'+display_name+'</div>\
                          <div class="viewers">\
                              <span class="glyphicon glyphicon-user"></span> '+data.viewers+'\
                          </div>\
                      </div>\
                  </div>\
              </a>\
              '+twitch_append+'\
          </li>';

      // GC
    	twitch_append = null;
    	display_name = null;
    	fixed_class = null;
    	fixed_append = null;
    	favorite_class = null;
    	favorite_append = null;
	});

    if(flag === 0)
        J$("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
    else
        J$("#popup_ADD_quick ul").empty().hide().append(append).fadeIn(300);

	// GC
	append = null;
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                 PRE-DEFINED
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/* arrive.js
 * v2.4.1
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 * Copyright (c) 2014-2017 Uzair Farooq
 */
var Arrive=function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback)}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave")}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n)},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n}},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback)},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r)},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t}}}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null)}},e.prototype.beforeAdding=function(e){this._beforeAdding=e},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e},e}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n)});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o}),i.beforeRemoving(function(e){e.observer.disconnect()}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n)},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1},i.removeEvent(t)},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1})},this},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t)})}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a)}c.call(this,e,t,r)},f},u=function(){function e(){var e={childList:!0,subtree:!0};return e}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t)})}function r(e,t){return l.matchesSelector(e,t.selector)}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r)},d},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);

/* easyNotify.js
 * https://github.com/Gabrielr47/easyNotify
 * Author : Gabriel Rodrigues
 */
!function(o){o.fn.easyNotify=function(i){var n=o.extend({title:"Notification",options:{body:"",icon:"",lang:"ko-KR",onClose:"",onClick:"",onError:""}},i);return this.init=function(){var o=this;if("Notification"in window)if("granted"===Notification.permission){var i=new Notification(n.title,n.options);i.onclose=function(){"function"==typeof n.options.onClose&&n.options.onClose()},i.onclick=function(){"function"==typeof n.options.onClick&&n.options.onClick()},i.onerror=function(){"function"==typeof n.options.onError&&n.options.onError()}}else"denied"!==Notification.permission&&Notification.requestPermission(function(i){"granted"===i&&o.init()});else alert("This browser does not support desktop notification")},this.init(),this}}(J$);

/* microtip.css
 * @author Ghosh
 * https://github.com/ghosh/microtip
 * MIT licensed
 */
J$('head').append('<style id="ADD_balloon" rel="stylesheet" type="text/css">\
[aria-label][role~="tooltip"]{position:relative}[aria-label][role~="tooltip"]:before,[aria-label][role~="tooltip"]:after{transform:translate3d(0,0,0);-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;opacity:0;pointer-events:none;transition:all var(--microtip-transition-duration,.18s) var(--microtip-transition-easing,ease-in-out) var(--microtip-transition-delay,0s);position:absolute;box-sizing:border-box;z-index:10;transform-origin:top}[aria-label][role~="tooltip"]:before{background-size:100% auto!important;content:""}[aria-label][role~="tooltip"]:after{background:rgba(17,17,17,.9);border-radius:4px;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size,11px);font-weight:var(--microtip-font-weight,normal);text-transform:var(--microtip-text-transform,none);padding:.5em 1em;white-space:nowrap;box-sizing:content-box}[aria-label][role~="tooltip"]:hover:before,[aria-label][role~="tooltip"]:hover:after,[aria-label][role~="tooltip"]:focus:before,[aria-label][role~="tooltip"]:focus:after{opacity:1;pointer-events:auto}[role~="tooltip"][data-microtip-position|="top"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-bottom:5px}[role~="tooltip"][data-microtip-position|="top"]:after{margin-bottom:11px}[role~="tooltip"][data-microtip-position|="top"]:before{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position|="top"]:hover:before{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position|="top"]:after{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position="top"]:hover:after{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position="top-left"]:after{transform:translate3d(calc(-100% + 16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-left"]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}[role~="tooltip"][data-microtip-position="top-right"]:after{transform:translate3d(calc(0% + -16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-right"]:hover:after{transform:translate3d(calc(0% + -16px),-5px,0)}[role~="tooltip"][data-microtip-position|="bottom"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-top:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position|="bottom"]:after{margin-top:11px}[role~="tooltip"][data-microtip-position|="bottom"]:before{transform:translate3d(-50%,-10px,0);bottom:auto;left:50%;top:100%}[role~="tooltip"][data-microtip-position|="bottom"]:hover:before{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position|="bottom"]:after{transform:translate3d(-50%,-10px,0);top:100%;left:50%}[role~="tooltip"][data-microtip-position="bottom"]:hover:after{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position="bottom-left"]:after{transform:translate3d(calc(-100% + 16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-left"]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}[role~="tooltip"][data-microtip-position="bottom-right"]:after{transform:translate3d(calc(0% + -16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-right"]:hover:after{transform:translate3d(calc(0% + -16px),0,0)}[role~="tooltip"][data-microtip-position="left"]:before,[role~="tooltip"][data-microtip-position="left"]:after{bottom:auto;left:auto;right:100%;top:50%;transform:translate3d(10px,-50%,0)}[role~="tooltip"][data-microtip-position="left"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-right:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position="left"]:after{margin-right:11px}[role~="tooltip"][data-microtip-position="left"]:hover:before,[role~="tooltip"][data-microtip-position="left"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before,[role~="tooltip"][data-microtip-position="right"]:after{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-bottom:0;margin-left:5px}[role~="tooltip"][data-microtip-position="right"]:after{margin-left:11px}[role~="tooltip"][data-microtip-position="right"]:hover:before,[role~="tooltip"][data-microtip-position="right"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-size="small"]:after{white-space:pre-line;width:80px}[role~="tooltip"][data-microtip-size="medium"]:after{white-space:pre-line;width:150px}[role~="tooltip"][data-microtip-size="large"]:after{white-space:pre-line;width:260px}[role~="tooltip"][data-microtip-size="custom"]:after{white-space:pre-line;width:220px;text-align:center}\
</style>');



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                               GLOBAL VARIABLES
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// API로 접근해서 스트리머 이름을 가져올 수도 있으나,
// API CALL 을 줄이기 위해 원래부터 두스 MAIN에 있던 스트리머 이름을 적어두기로 한다.
var streamerArray = [
    ['hanryang1125','풍월량'],
    ['ddahyoni','따효니'],
    ['kss7749','쉐리'],
    ['looksam','룩삼'],
    ['yapyap30','얍얍'],
    ['saddummy','서새봄냥'],
    ['109ace','철면수심'],
    ['rhdgurwns','공혁준'],
    ['gmdkdsla','흐앙님'],
    ['jungtaejune','똘똘똘이'],
    ['mascahs','마스카'],
    ['steelohs','스틸로'],
    ['kimdoe','김도'],
    ['togom','토곰'],
    ['ogn_lol','OGN 롤챔스'],
    ['kanetv8','케인TV'],
    ['yumyumyu77','소풍왔니'],
    ['sung0','쥬팬더'],
    ['game2eye','홍방장'],
    ['cocopopp671','초승달'],
    ['dingception','딩셉션'],
    ['redteahs','홍차'],
    ['zzamtiger0310','수아'],
    ['rldnddl789','아빠킹'],
    ['eulcs1','EU LCS'],
    ['kkoma','SKT T1 Kkoma'],
    ['1983kej','단군'],
    ['lol_peanut','SKT T1 Peanut'],
    ['faker','SKT T1 Faker'],
    ['nrmtzv','으음'],
    ['nicegametv','나겜'],
    ['teaminven','인벤'],
    ['capta1n_pony','포니'],
    ['huni','SKT T1 Huni'],
    ['sktt1_wolf','SKT T1 Wolf'],
    ['bang','SKT T1 Bang'],
    ['wpghd321','류제홍'],
    ['jmjdoc','칸데르니아'],
    ['yungi131','윤기'],
    ['mediamuse','미디어뮤즈'],
    ['veritaskk','CJE Veritas'],
    ['themarinekr','김정민'],
    ['tvindra','인드라'],
    ['tranth','자동'],
    ['seine1026','세인님'],
    ['sonycast_','소니쇼'],
    ['dou3796','뱅붕'],
    ['rudbeckia7','연두는말안드뤄'],
    ['trisha','트리샤'],
    ['naseongkim','김나성'],
    ['mari0712','마리'],
    ['dlxowns45','태준이'],
    ['handongsuk','한동숙'],
    ['alenenwooptv','웁_게임방송'],
    ['mr_coat','노래하는코트'],
    ['ajehr','머독'],
    ['lol_crown','SSG Crown'],
    ['rooftopcat99','옥냥이'],
    ['myzet1990','개구멍'],
    ['yoonroot','윤루트'],
    ['sn400ja','액시스마이콜'],
    ['tape22222','테이프2'],
    ['miracle0o0','미라클티비'],
    ['bighead033','빅헤드'],
    ['wkgml','견자희'],
    ['queenhuz','후즈'],
    ['kiyulking','김기열'],
    ['asdn6388','나락호프'],
    ['lol_cuvee','SSG Cuvee'],
    ['VSL','VSL'],
    ['drlee_kor','이민우33세'],
    ['CoreJJ','SSG CoreJJ'],
    ['lol_ambition','SSG Ambition'],
    ['Axenix','아제닉스'],
    ['maknoonlol','막눈'],
    ['zilioner','침착맨'],
    ['timeofcreate','홍랑'],
    ['twitchshow','트위치쇼'],
    ['kangqui','강퀴'],
    ['team_spiritzero','team_spiritzero'],
    ['zizionmy','젼마이'],
    ['lol_blank','SKT T1 Blank'],
    ['ogn_ow','OGN 오버워치'],
    ['starcraft_kr','스타크래프트 KR']
    ];// ['',''],

var href = 'initialize';            //
var multitwitchID = 'hanryang1125'; // 멀티트위치 ID 저장용
var streamerID = '';                // 
var ADD_API_SET_INTERVAL;           // 

var ADD_config_ary = [];            // 설정 변수
var fixed_streamer = [];            // 상단 고정 스트리머 이름 배열
var alarm_streamer = [];            // Twitch api 접근 스트리머 이름 배열
var twitch_api_cookie = [];         // Twitch api 쿠키

var ADD_config_ary_init = {
                         'ADD_config_top_fix' : false,
                         'ADD_config_top_off_fix' : false,
                         'ADD_config_top_fix_ID' : 'hanryang1125',
                         'ADD_config_alarm' : false,
                         'ADD_config_alarm_gap' : 5,
                         'ADD_config_top_alarm_ID' : 'hanryang1125',
                         'ADD_config_thumbnail_mouse' : false,
                         'ADD_config_thumbnail_size' : 1,
                         'ADD_config_streamer_hide' : false,
                         'ADD_config_streamer_hide_ID' : 'nalcs1, nalcs2',
                         'ADD_config_remember_kakao' : false,
                         'ADD_config_remember_youtube' : false,
                         'ADD_config_last_version' : version,
                         'ADD_config_dev_on' : false,
                         'ADD_config_chat_ctr' : false,
                         'ADD_config_chat_adb' : false,
                         'ADD_config_imgur_preview' : false,
                         'ADD_config_imgur_preview_safe' : true,
                         'ADD_config_imgur_preview_opacity' : 0.93,
                         'ADD_config_sys_meg' : false,
                         'ADD_config_alarm_noti' : false,
                         'ADD_config_url_self' : false,
                         'ADD_config_chat_scroll' : true
                      };

// 설정 클릭 시 enable 요소가 있는 설정을 아래 배열에 등록
var ADD_config_enable_init = ['ADD_config_top_fix'
                              ,'ADD_config_alarm'
                              ,'ADD_config_thumbnail_mouse'
                              ,'ADD_config_streamer_hide'
                              ,'ADD_config_chat_ctr'
                              ,'ADD_config_imgur_preview'
                              ,'ADD_config_imgur_preview_safe'
                              ];

var first_api_call = true;          // 첫번째 api 호출인지 체크함
var api_push_forced = false;        // true 이면 twitch api를 강제로 push 함, Setting save 시 사용
var local_api_refresh = true;       // Setting save 버튼 연속으로 눌렀을 때 막기 위한 용도
var unique_window_check = true;     // Unique window 감지용
var backbutton_checker = false;     // 현재 사용 안 함, Back button 감지용
var chat_send_location = true;      // 현재 사용 안 함, ADD_send_location() 좌표 복사 딜레이를 위해 사용
var chatting_arrive_check = null;   // 채팅창 arrive 체크용
var thumbnail_check = null;         // 섬네일 마우스 오버 설정 변경 체크용
var thumbnail_size_check = null;    // 현재 사용 안 함, 섬네일 마우스 오버시 사이즈 설정 변경 체크용
var chatting_scroll_pause = null;   // 채팅 스크롤 일시정지 여부

var max_iteration = 100;            // DOE 생성 체크 최대 횟수
var iteration = 0;                  // DOE 생성 체크 현재 횟수
var checked_box_no = 0;

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                          FUNCTION - COOKIE AND config
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 설정 관련 쿠키 변수 초기화
function ADD_cookie_var_initialize()
{
    // 글로벌 변수를 가져와서 초기화 함
    ADD_config_ary = ADD_config_ary_init;
    
    // Object 키 길이 구하는 방법
    // ADD_config_ary_length = Object.keys(ADD_config_ary).length;
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 쿠키 삭제
function ADD_config_cookie_remove()
{
    // 설정 쿠키값이 존재하는 경우 쿠키값을 지운다.
    if (!!J$.Jcookie('ADD_config_ary'))
       J$.removeCookie("ADD_config_ary");
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 변수로부터 설정 쿠키 생성
function ADD_config_cookie_create()
{
    // 설정 변수가 존재하는 경우 해당 설정 변수로 쿠키를 생성한다.
    if (!(typeof ADD_config_ary === 'undefined'))
       J$.Jcookie('ADD_config_ary', JSON.stringify(ADD_config_ary), { expires : 365*2, path : '/' });
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 쿠키 값을 변수에 저장
function ADD_cookie_to_var()
{
    // 설정 쿠키값이 존재하는 경우,
    if (!!J$.Jcookie('ADD_config_ary'))
    {
        // 쿠키값을 읽어와서 설정 변수로 만든다.
        ADD_config_ary = JSON.parse(J$.Jcookie('ADD_config_ary'));
        var ADD_config_top_fix_ID = ADD_config_ary.ADD_config_top_fix_ID;
        var ADD_config_top_alarm_ID = ADD_config_ary.ADD_config_top_alarm_ID;
        var ADD_config_streamer_hide_ID = ADD_config_ary.ADD_config_streamer_hide_ID;

        // text ary 관련 설정의 경우 공백을 지운 다음 콤마(,)로 나누어 변수에 저장한다.
        if( ADD_config_top_fix_ID !== undefined || ADD_config_top_fix_ID !== null)
            fixed_streamer = ADD_config_top_fix_ID.replace(/\s/g,'').toLowerCase().split(',');
        else
            fixed_streamer = [];

        if( ADD_config_top_alarm_ID !== undefined || ADD_config_top_alarm_ID !== null)
            alarm_streamer = ADD_config_top_alarm_ID.replace(/\s/g,'').toLowerCase().split(',');
        else
            alarm_streamer = [];

        if( ADD_config_streamer_hide_ID !== undefined || ADD_config_streamer_hide_ID !== null)
            hide_streamer = ADD_config_streamer_hide_ID.replace(/\s/g,'').toLowerCase().split(',');
        else
            hide_streamer = [];
        
        // GC
        ADD_config_top_fix_ID = null;
        ADD_config_top_alarm_ID = null;
        ADD_config_streamer_hide_ID = null;
        
    }
    else
    {
        // 설정 쿠키값이 존재하지 않는 경우
        ADD_cookie_var_initialize();
    }
    
    // event binding
    ADD_event_binding();
}


//////////////////////////////////////////////////////////////////////////////////
// 설정으로 인해 on-off 되는 이벤트는 이곳에서 관리
function ADD_event_binding()
{
    // 채팅 내 이미지 preview 설정 관련됨
    if(ADD_config_ary.ADD_config_imgur_preview !== undefined)
    {
        ADD_DEBUG_MODE && console.log('ADD_chatting_arrive() 함수 실행 됨!');
        ADD_chatting_arrive();
    }
    
    
    // 섬네일 마우스 오버 설정 관련됨
    if(ADD_config_ary.ADD_config_thumbnail_mouse !== undefined)
    {
        ADD_DEBUG_MODE && console.log('ADD_thumbnail_mouseover() 함수 실행 됨!');
        ADD_thumbnail_mouseover();
    }
    

    // 데스크탑 알림 권한 관련됨
    if(ADD_config_ary.ADD_config_alarm_noti !== undefined && ADD_config_ary.ADD_config_alarm_noti)
    {
        ADD_DEBUG_MODE && console.log('Notification.permission = ', Notification.permission);
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    }
    
    
    // 채팅창 스크롤 관련됨
    if(ADD_config_ary.ADD_config_chat_scroll !== undefined)
    {
        ADD_DEBUG_MODE && console.log('ADD_chat_scroll_pause() 함수 실행 됨!');
        ADD_chat_scroll_pause();
    }

}


//////////////////////////////////////////////////////////////////////////////////
// 설정 창에 설정 쿠키 값을 덮어씌우기 위한 함수
function ADD_var_to_config_form()
{
    // 설정 변수가 정의되어 있지 않은 경우 설정 변수를 생성한다.
    if (typeof ADD_config_ary === 'undefined') //  || ADD_config_ary === null
    {
        ADD_DEBUG_MODE && console.log('ADD_var_to_config_form() 에서 ADD_cookie_to_var() 실행됨');
        ADD_cookie_to_var();
    }

    for(key in ADD_config_ary)
    {
        var ADD_ct = ADD_config_ary[key];
        var ADD_config_ID_text;
        var ADD_config_type;
        
        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다. 
        if (key == 'ADD_config_thumbnail_size')
            ADD_config_ID_text = '#'+key+'_'+ADD_ct;
        else
            ADD_config_ID_text = '#'+key;

        var ADD_config_ID = J$(ADD_config_ID_text);
        
        // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
        if(ADD_config_ID.length === 0)
            continue;

        // 해당 ID 요소의 type 을 변수에 저장한다.
        ADD_config_type = ADD_config_ID.attr('type');
        
        // 위에서 찾은 각 설정창 타입에 맞게 변수를 입력해준다.
        if (ADD_config_type == 'text')
        {
            // 1. 설정창 타입이 text 인 경우
            ADD_config_ID.val(ADD_ct);
        }
        else if (ADD_config_type == 'checkbox')
        {
            // 2. 설정창 타입이 checkbox 인 경우
            ADD_config_ID.prop('checked', ADD_ct);
        }
        else if (ADD_config_type == 'radio')
        {
            // 3. 설정창 타입이 radio 인 경우
            ADD_config_ID.prop('checked', true);
        }
        
        // GC
        ADD_ct = null;
        ADD_config_ID_text = null;
        ADD_config_type = null;
    };
    
    // 설정 팝업 내 체크에 따른 enable 여부 초기화
    ADD_config_enable(ADD_config_enable_init);
    
    // 설정 팝업 내 개발 중 옵션을 보여주는지 여부를 확인하여 초기화
    if(ADD_config_ary.ADD_config_dev_on !== undefined && ADD_config_ary.ADD_config_dev_on)
    {
        J$('.ADD_under_dev').show();
    }
}


//////////////////////////////////////////////////////////////////////////////////
// 설정창 값을 쿠키에 저장
function ADD_save_config_to_cookie()
{
    // 설정 변수가 없는 경우, 기본값으로 초기화한다.
    if (typeof ADD_config_ary === 'undefined')
        ADD_cookie_var_initialize();
     
    for(key in ADD_config_ary)
    {
        // 로컬 변수 선언
        var ADD_config_ID_text;
        var ADD_config_ID;
        var ADD_config_type;
        
        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
        if (key == 'ADD_config_thumbnail_size')
        {
            ADD_config_ID_text = 'input[name='+key+']:checked';
        }
        else
        {
            ADD_config_ID_text = '#'+key;
        }

        ADD_config_ID = J$(ADD_config_ID_text);
        
        // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
        if(ADD_config_ID.length === 0)
        {
            // GC
            ADD_config_ID_text = null;
            ADD_config_ID = null;
            ADD_config_type = null;

            continue;
        }
        
        // 해당 ID 요소의 type 을 변수에 저장한다.
        ADD_config_type = ADD_config_ID.attr('type');
        
        // 위에서 찾은 각 설정창 타입에 맞게 쿠키에 입력한다.
        if (ADD_config_type == 'text')
        {
            // 1. 설정창 타입이 text 인 경우
            ADD_config_ary[key] = ADD_config_ID.val();
        }
        else if (ADD_config_type == 'checkbox')
        {
            // 2. 설정창 타입이 checkbox 인 경우
            ADD_config_ary[key] = ADD_config_ID.prop('checked');
        }
        else if (ADD_config_type == 'radio')
        {
            // 3. 설정창 타입이 radio 인 경우
            ADD_config_ary[key] = ADD_config_ID.val();
        }
        
        // GC
        ADD_config_ID_text = null;
        ADD_config_ID = null;
        ADD_config_type = null;
    }; // for(key in ADD_config_ary) 끝
    
    // 설정 쿠키를 만든다.
    ADD_config_cookie_create();
}


//////////////////////////////////////////////////////////////////////////////////
// 쿠키에 저장된 마지막 버전 체크하여 버전별 호환성 체크
function ADD_last_version_checker()
{
    // 로컬 변수 선언
    var temp_config = JSON.parse(J$.Jcookie('ADD_config_ary'));

    if (typeof temp_config.ADD_config_last_version === 'undefined')
    {
        // 버전 명이 아예 없으면 1.11 버전이다.
        // 쿠키 변수를 초기화 한다.
        ADD_cookie_var_initialize();
        
        // 1.11 버전 변수를 현재 버전에 포팅한다.
        ADD_config_ary.ADD_config_top_fix = temp_config[0];
        ADD_config_ary.ADD_config_top_off_fix = temp_config[1];
        ADD_config_ary.ADD_config_top_fix_ID = temp_config[2];
        ADD_config_ary.ADD_config_alarm = temp_config[3];
        ADD_config_ary.ADD_config_alarm_gap = temp_config[4];
        ADD_config_ary.ADD_config_top_alarm_ID = temp_config[5];
        ADD_config_ary.ADD_config_thumbnail_mouse = temp_config[6];
        ADD_config_ary.ADD_config_thumbnail_size = temp_config[7];
        ADD_config_ary.ADD_config_streamer_hide = temp_config[8];
        ADD_config_ary.ADD_config_streamer_hide_ID = temp_config[9];
        
        // 쿠키를 재생성 한다.
        ADD_config_cookie_create();
    }
    else if(Number(temp_config.ADD_config_last_version) !== Number(version))
    {
        // 쿠키에 저장된 변수와 현재 버전이 다른 경우
        // 로컬 변수 선언
        var old_ver = Number(temp_config.ADD_config_last_version);
        var new_ver = Number(version);
        var notice_text_string;
        
        // 쿠키 업데이트
        ADD_config_ary = temp_config;
        ADD_config_ary.ADD_config_last_version = version;
        
        // key 확인하여 새로운 key 값이 존재하는 경우 해당 key 값을 추가함
        for(var key in ADD_config_ary_init)
        {
           if( !(key in ADD_config_ary) )
           {
               ADD_DEBUG_MODE && console.log('New setting value is checked, key = '+key);
               ADD_config_ary[key] = ADD_config_ary_init[key];
           }
        }
        
        // 설정 변수로부터 쿠키 재생성
        ADD_config_cookie_create();
        
        // 알림 영역 텍스트 출력부
        notice_text_string = 'Userscript가 최근에 변경 됨!';
        if(old_ver < new_ver)
           notice_text_string = notice_text_string+' 버전 업!';
        else
           notice_text_string = notice_text_string+' 버전 다운!';
        notice_text_string = notice_text_string+' '+old_ver+' → '+new_ver;
        
        // DOE 딜레이 처리
        ADD_DEBUG_MODE && console.log('ADDostream version changed! ',notice_text_string);
        if(J$('#notice_text_elem').length !== 0)
        {
            J$('#notice_text').html(notice_text_string);
            J$('#notice_text_elem').fadeIn('1000');
            notice_text_string = null;
        }
        else
        {
            setTimeout(function() {
                J$('#notice_text').html(notice_text_string);
                J$('#notice_text_elem').fadeIn('1000');
                notice_text_string = null;
            }, 1000);
        }
        // 알림 영역 끝
        
        
        // GC
        old_ver = null;
        new_ver = null;
        
    }
    
    // GC
    temp_config = null;
}


//////////////////////////////////////////////////////////////////////////////////
// 쿠키 있는지 확인하여, 있으면 쿠키값을 변수에 저장. 없으면 생성
function ADD_main_config_cookie()
{
    if (!J$.Jcookie('ADD_config_ary'))
    {
        // 쿠키가 없으면, 설정 변수를 초기화 한 뒤 해당 설정 변수로부터 쿠키를 만든다.
        ADD_cookie_var_initialize();
        ADD_config_cookie_create();
    }
    
    // 쿠키를 다시 변수에 쓴다.
    ADD_last_version_checker();
    ADD_DEBUG_MODE && console.log('ADD_main_config_cookie() 에서 ADD_cookie_to_var() 실행됨');
    ADD_cookie_to_var();
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                              FUNCTION - API
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 배열 병합 함수
var concatArraysUniqueWithSort = function (thisArray, otherArray) {
    var newArray = thisArray.concat(otherArray).sort(function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    });

    return newArray.filter(function (item, index) {
        return newArray.indexOf(item) === index;
    });
};


//////////////////////////////////////////////////////////////////////////////////
// Twitch API
function twitch_api()
{
    var ADD_config_alarm = ADD_config_ary.ADD_config_alarm;

    // ADD_config_alarm === false 이면 return.
    if(!ADD_config_alarm)
    {
        // GC
        ADD_config_alarm = null;
        return false;
    }

    // 로컬변수 선언
    var ADD_config_alarm_gap;
    var api_update = true;
    var now_time = new Date();
    
    // 쿠키에 저장된 api 갱신 간격 시간을 ADD_config_alarm_gap에 저장,
    // 해당 값이 1.0 보다 작을 경우 1.0 으로 고정함
    ADD_config_alarm_gap = Number(ADD_config_ary.ADD_config_alarm_gap);
    if (ADD_config_alarm_gap < 1.0)
        ADD_config_alarm_gap = 1.0;

    if (!!J$.Jcookie('api_check_pre_time'))
    {
        api_pre_time = new Date(J$.Jcookie('api_check_pre_time'));
        left_time = (api_pre_time - now_time); // in ms, .getTime()
        api_update = left_time < 0;
    }

    if (unique_window_check && ADD_config_alarm && (api_push_forced || api_update))
    {
        api_push_forced = false;
        // api update 

        // cookie update
        var api_expires = new Date();
        api_expires.setMinutes( api_expires.getMinutes() + ADD_config_alarm_gap );
        J$.Jcookie('api_check_pre_time', api_expires, { expires : api_expires, path : '/' });
        ADD_DEBUG_MODE && console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_expires+'.\nCookie is updated.');
        
        // cookie check
        if ((!!J$.Jcookie('api_check_pre_time')) && (!!J$.Jcookie('ADD_config_ary')) ) 
        {   
            ADD_DEBUG_MODE && console.log('All cookie checked for api');

            // 로컬 변수 선언
            var ADD_Client_ID = 'phcxzq5994awjrevkt45p6711bt77s';
            var possibleChannels = [];
            var possibleChannelsString = '';
            var possibleChannelsNo = 0;
            var lastNo = 0;

            var ADD_config_top_off_fix = ADD_config_ary.ADD_config_top_off_fix;
            var ADD_config_alarm = ADD_config_ary.ADD_config_alarm;
            
            /*
            if(ADD_config_top_off_fix && ADD_config_alarm)
                possibleChannels = concatArraysUniqueWithSort(fixed_streamer, alarm_streamer);
            else if(ADD_config_top_off_fix)
                possibleChannels = fixed_streamer;
            else if(alarm_streamer)
                possibleChannels = alarm_streamer;
            */
            possibleChannels = alarm_streamer;
            
            possibleChannelsString = possibleChannels.join(',').replace(' ', '');
            possibleChannelsNo = possibleChannels.length;

            if(possibleChannelsNo > 0)
            {
                ADD_DEBUG_MODE && console.log('Api call channels no. :'+possibleChannels.length + ', name : ' + possibleChannelsString.replace(' ', ''));
                J$.ajax({
                     url:'https://api.twitch.tv/kraken/streams?offset=0&limit=100&channel='+possibleChannelsString.replace(' ', ''),
                     type: 'GET',
                     contentType: 'application/json',
                     dataType:'json',
                     headers: {'Client-ID': ADD_Client_ID},

                     // API CALL SUCCESS
                     success:function(channel)
                     {
                          var temp_twitch_api_cookie = [];
                          // temp 에 이전 api 쿠키를 복사한다.
                          // 현재는 desktop alarm 이 켜진 경우만 복사한다.
                          if ( (!!J$.Jcookie('twitch_api_cookie')) && ADD_config_ary.ADD_config_alarm_noti)
                              temp_twitch_api_cookie = JSON.parse(J$.Jcookie('twitch_api_cookie'));//twitch_api_cookie.slice(0);

                          var streams = channel.streams;
                          var temp_body = '';
                          var noti_check = ((ADD_config_ary.ADD_config_alarm_noti !== undefined) && ADD_config_ary.ADD_config_alarm_noti);
                          api_expires.setMinutes( api_expires.getMinutes() + 10 );

                          ADD_DEBUG_MODE && console.log('noti_check :',noti_check);                          
                          ADD_DEBUG_MODE && console.log('Twitch API request succeeded', channel);
                          ADD_DEBUG_MODE && console.log('streams.length = ', streams.length);

                          // 온라인 스트리머가 있는 경우
                          if(streams.length !== 0)
                          {
                              for (var i = 0; i < streams.length; i++) {
                                  if(i === 0)
                                  {
                                      // API 변수 초기화
                                      twitch_api_cookie = [];
                                  }
                                  
                                  var stream = streams[i];
                                  if (stream !== null)
                                  {
                                      twitch_api_cookie[i] = {
                                          'name' : stream.channel.name,
                                          'display_name' : stream.channel.display_name,
                                          'status' : stream.channel.status,
                                          'viewers' : stream.viewers,
                                          'game' : stream.channel.game
                                      };
                                  }
                                  
                                  // 데스크톱 알림 허용인 경우
                                  if( noti_check )
                                  {
                                      // 첫번째 call 이고 기존 쿠키 존재 안 하는 경우 (완전히 첫 접속인 경우)
                                      if(first_api_call && (!J$.Jcookie('twitch_api_cookie')) )
                                      {
                                          if(i !== 0)
                                              temp_body += ' ,';
                                          temp_body += stream.channel.name;

                                          if(i === streams.length -1)
                                          {
                                              ADD_DEBUG_MODE && console.log('Twitch api 첫번째 알림', temp_body);
                                              var noti_options = {
                                                    title: 'Dostream+',
                                                    options: {
                                                      body: temp_body,
                                                      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
                                                      lang: 'ko-KR'
                                                    }
                                              };

                                              J$("#easyNotify").easyNotify(noti_options);

                                              // GC
                                              noti_options = null;
                                          }
                                      }
                                      // 기존 쿠키 존재 하는 경우
                                      else if( (!!J$.Jcookie('twitch_api_cookie')) )
                                      {
                                          // 이전 api call 한 내역에 이번에 api call 한 이름이 있는지 체크
                                          console.log(temp_twitch_api_cookie);
                                          var first_call_check = temp_twitch_api_cookie.filter(function (obj) {
                                                  return obj.name === stream.channel.name;
                                          })[0];
                                          
                                          // 이전에 call 하지 않은 스트리머인 경우 개별 데스크톱 알림
                                          if(first_call_check === undefined || first_call_check === null)
                                          {
                                              var noti_options = {
                                                    title: stream.channel.display_name,
                                                    options: {
                                                      body: stream.channel.game+' - '+stream.viewers+' viewers\n'+stream.channel.status,
                                                      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
                                                      lang: 'ko-KR'
                                                    }
                                              };
                                              
                                              J$("#easyNotify").easyNotify(noti_options);
                                              
                                              // GC
                                              first_call_check = null;
                                              noti_options = null;
                                          }
                                          else
                                          {
                                              ADD_DEBUG_MODE && console.log(stream.channel.name + ' : 이전에 이미 api call 하였으므로 알림하지 않음');
                                          }
                                      }
                                  }
                                  
                                  // GC
                                  stream = null;
                              }; // streams 에 대한 for문 끝
                             
                             // 쿠키 쓰기
                              J$.Jcookie('twitch_api_cookie', JSON.stringify(twitch_api_cookie), { expires : api_expires, path : '/' });
                          }
                          // 온라인 스트리머가 없는 경우
                          else
                          {
                              ADD_DEBUG_MODE && console.log('There is no online streamer, Twitch API cookie is removed');
                              J$.removeCookie('twitch_api_cookie');
                          }
                          
                          // 처음 api 호출 끝나면 false 로 바꾼다.
                          if(first_api_call)
                              first_api_call = false;
                          
                          // GC
                          temp_twitch_api_cookie = null;
                          streams = null;
                          temp_body = null;
                          noti_check = null;
                     },

                     // API CALL ERROR
                     error:function()
                     {
                          ADD_DEBUG_MODE && console.log('api request failed');
                     }
                });
            }

        }
    }
    else
    {
        // not update
        left_time = Math.floor(left_time/60/1000)+' min '+Math.floor((left_time/1000)%60)+' sec';
        ADD_DEBUG_MODE && console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_pre_time+'.\nCookie is not updated.\nCookie will update after '+left_time);
        if ( !!J$.Jcookie('twitch_api_cookie') )
        {
            // 쿠키 존재 시 변수로 쓴다.
            twitch_api_cookie = JSON.parse(J$.Jcookie('twitch_api_cookie'));
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////
// Twitch API를 주기적으로 호출하기 위한 함수
function ADD_API_CALL_INTERVAL()
{
    intervalTime = Number(ADD_config_ary.ADD_config_alarm_gap);
    if (intervalTime < 1.0)
        intervalTime = 1.0;
    intervalTime = intervalTime*1000*60;

    if (ADD_API_SET_INTERVAL)
      clearInterval(ADD_API_SET_INTERVAL);

    ADD_API_SET_INTERVAL = setInterval(function() {
        ADD_DEBUG_MODE && console.log('ADD_API_CALL_INTERVAL()');

        // Write config form from cookie
        // ADD_cookie_to_var();

        // Call Twitch api
        twitch_api();
    }, intervalTime);
}


////////////////////////////////// UNIQUE WINDOW /////////////////////////////////
// 다중창 체크하여 Twitch api 호출 막음
function ADD_multiwindow_prevent()
{
unique_window = new Date();
unique_window = Number(unique_window.getTime());
J$.Jcookie('unique_window', unique_window, { expires : 30, path : '/' });

setInterval(function() {
      unique_window_cookie = Number(J$.Jcookie('unique_window'));
          if((unique_window_check==true)&&(unique_window != unique_window_cookie))
            {
              ADD_DEBUG_MODE && console.log('unique window = ',unique_window);
              ADD_DEBUG_MODE && console.log('unique window cookie is ',unique_window_cookie);
              unique_window_check = false;
              J$('#notice_text').html('새 창에서 접속이 감지되어 API 갱신이 중지됩니다.');
              J$('#notice_text_elem').show();
              clearInterval(ADD_API_SET_INTERVAL);
            }
}, 1000);

}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                FUNCTION - DOE
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



function ADD_multitwitch_DOE()
{
    if( J$('#multitwitch').length === 0 )
        J$('.search').append('<span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span>');
}

// 17-09-19 : 임시로 필요 없는 것을 숨긴다.
function ADD_temp(){
    if( J$('ul.nav').length !== 0 )
        J$('ul.nav').remove();
    if( J$('#streamSearchForm').length !== 0 )
        J$('#streamSearchForm').remove();
}
      // 임시 복구용
      ADD_temp();


//////////////////////////////////////////////////////////////////////////////////
// 설정 관련 버튼, 팝업 DOE 생성
function ADD_config_DOE()
{
      // 설정 버튼 및 팝업 생성
      J$('header .container').append('\
          <div style="position:relative;">\
          <div id="notice_text_elem"><span id="notice_text">문어문어문어문어<br />블러드트레일 블러드트레일</span></div>\
              <div class="AD_title">\
                 <span id="ADD_quick_list" class="btn btn-default btn_closed">\
                    <span class="glyphicon glyphicon-list">\
                    </span>\
                 </span>\
                 <span id="ADD_config" class="btn btn-default btn_closed">\
                    <span class="glyphicon glyphicon-cog">\
                    </span>\
                 </span>\
              </div>\
              \
              <div id="popup_ADD_quick" class="modal-dialog">\
                 <div class="modal-content">\
                    <div class="modal-body">\
                        <div class="quick_list_title">Quick list</div>\
                        <ul></ul>\
                    </div>\
                 </div>\
              </div>\
              \
              <div id="popup_ADD_config" class="modal-dialog">\
                 <div class="modal-content">\
                    <div class="modal-body">\
                       <table class="table table-condensed table-hover" style="margin-bottom:0px;">\
                           <thead><tr><th><a href="https://github.com/nomomo/Addostream" target="_blank">ADDostram version: '+version+'</a></th><th></th></tr></thead>\
                           <tbody>\
                              <tr class="active">\
                                 <td class="td_strong">특정 스트리머 상단 고정</td>\
                                 <td><input type="checkbox" id="ADD_config_top_fix" onfocus="this.blur()"  /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 오프라인 시에도 고정</td>\
                                 <td><input type="checkbox" id="ADD_config_top_off_fix" onfocus="this.blur()" class="ADD_config_top_fix_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 상단 고정 스트리머 아이디(콤마로 구분)</td>\
                                 <td><input type="text" id="ADD_config_top_fix_ID" style="width:100%;" class="ADD_config_top_fix_form form_enabled" /></td>\
                              </tr>\
                              <tr class="active">\
                                 <td class="td_strong">메인에 없는 스트리머 추가</td>\
                                 <td><input type="checkbox" id="ADD_config_alarm" onfocus="this.blur()" /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 스트리머 조회 간격(최소 1분)</td>\
                                 <td><input type="text" id="ADD_config_alarm_gap" style="width:100%;" class="ADD_config_alarm_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 스트리머 아이디(콤마로 구분)</td>\
                                 <td><input type="text" id="ADD_config_top_alarm_ID" style="width:100%;" class="ADD_config_alarm_form form_enabled" /></td>\
                              </tr>\
                              <tr class="ADD_under_dev">\
                                 <td>└ [!] 온라인 시 데스크톱 메시지로 알림 \
                                     <span class="tooltip_container" aria-label="위 메인에 없는 스트리머 아이디 목록에 등록된 스트리머가 온라인이 되면 알린다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_alarm_noti" onfocus="this.blur()" class="ADD_config_alarm_form form_enabled" /></td>\
                              </tr>\
                              <tr class="active">\
                                 <td class="td_strong">특정 스트리머 메인에서 숨기기</td>\
                                 <td><input type="checkbox" id="ADD_config_streamer_hide" onfocus="this.blur()" class="form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 숨길 스트리머 아이디(콤마로 구분)</td>\
                                 <td><input type="text" id="ADD_config_streamer_hide_ID" style="width:100%;" class="ADD_config_streamer_hide_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">채팅 컨트롤 \
                                     <span class="tooltip_container" aria-label="채팅 관련 기능을 활성화 한다. 채팅창에서 닉네임을 클릭하면 메모를 추가할 수 있는 기능을 기본으로 제공한다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#333;"></span>\
                                     </span>\
                                 </td>\
                                 <td>\
                                     <input type="checkbox" id="ADD_config_chat_ctr" onfocus="this.blur()" class="form_enabled" style="margin-right:50px;" />\
                                     <input type="checkbox" id="ADD_config_chat_adb" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" /> 광고차단\
                                     <span aria-label="U chat 광고 메시지를 없앤다." data-microtip-position="top-left" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">휠로 채팅 자동스크롤 정지 \
                                     <span class="tooltip_container" aria-label="트위치 채팅창에서 마우스 휠을 위로 돌리면 채팅창 자동스크롤이 정지하는 것을 단순하게 구현함." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_chat_scroll" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">채팅 내 두스 좌표는 현재 창에서 오픈 \
                                     <span class="tooltip_container" aria-label="좌표 클릭 시 매번 새 창으로 뜨는 것이 귀찮아서 추가함. ctrl 또는 shift 키를 누른 채로 클릭하여 기존처럼 새 탭 또는 새 창으로 여는 것도 가능. 이 설정을 켠 이후 등록된 채팅에만 적용." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_url_self" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">채팅 imgur 이미지 미리보기 \
                                     <span class="tooltip_container" aria-label="imgur 링크가 채팅창에 등록되면 바로 보여준다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_imgur_preview" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td>└ 버튼 클릭 후 이미지 활성(후방주의 기능) \
                                     <span class="tooltip_container" aria-label="이미지를 어둡게 가려진 상태로 보여준다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_imgur_preview_safe" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_imgur_preview_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td>　└ 박스 투명도(0:투명, 1:불투명, 기본값 0.93)</td>\
                                 <td><input type="text" id="ADD_config_imgur_preview_opacity" style="width:100%;" class="ADD_config_chat_ctr_form ADD_config_imgur_preview_form ADD_config_imgur_preview_safe_form form_enabled" /></td>\
                              </tr>\
                              <tr style="display:none">\
                                 <td class="td_strong">스크립트 작동 상태를 알림 \
                                     <span class="tooltip_container" aria-label="스트리머 조회, 페이지 갱신 등 스크립트의 주요 동작 상태를 채팅창의 시스템 메시지처럼 알려준다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_sys_meg" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">섬네일 마우스 오버시 확대</td>\
                                 <td>\
                                     <input type="checkbox" id="ADD_config_thumbnail_mouse" class="ADD_config_chat_ctr_form" onfocus="this.blur()"  />\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_1" value="1" class="ADD_config_chat_ctr_form ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 작음\
                                     </label>\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_2" value="2" class="ADD_config_chat_ctr_form ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 중간\
                                     </label>\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_3" value="3" class="ADD_config_chat_ctr_form ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 큼\
                                     </label>\
                                 </td>\
                              </tr>\
                              <tr class="debug_active">\
                                 <td class="td_strong">개발 중 기능 표시 <span class="glyphicon glyphicon-wrench" style="color:#999;"></span> \
                                     <span class="tooltip_container" aria-label="개발 중인 기능을 보여준다. 해당 기능들은 완성되지 않았으며 불안정함." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_dev_on" onfocus="this.blur()" class="form_enabled" /></td>\
                              </tr>\
                              <tr class="active" style="display:none;">\
                                 <td class="td_strong">활성화/비활성화 여부 기억</td>\
                                 <td>\
                                     <label class="radio-inline">\
                                      <input type="checkbox" id="ADD_config_remember_kakao" onfocus="this.blur()"  /> 카카오\
                                     </label>\
                                     <label class="radio-inline">\
                                      <input type="checkbox" id="ADD_config_remember_youtube" onfocus="this.blur()"  /> 유투브\
                                     </label>\
                                 </td>\
                              </tr>\
                          </tbody>\
                       </table>\
                    </div>\
                    <div class="modal-footer">\
                      <!--<div class="glyphicon glyphicon-ok bg-success" style="display:block;float:left;height:30px; width:100%;padding:7px 0px;">Saved successfully!</div>-->\
                      <div id="ADD_config_Success" class="btn btn-success confirm_selection" style="display:none;">Done! 문제가 있다면 새로고침 또는<br /> 브라우저 쿠키 초기화 후 재설정 하세요.</div>\
                        <button type="button" id="Cookie_reset" class="btn btn-sm">Config reset</button>\
                        <button type="button" id="ADD_config_save" class="btn btn-primary btn-sm">Save changes</button>\
                    </div>\
                 </div>\
              </div>\
              \
          </div>\
      ');


      // 디버그 모드의 경우 디버그용 버튼 및 팝업 생성
      if(ADD_DEBUG_MODE){
          J$('#ADD_quick_list').before('\
                     <span id="ADD_test_button" class="btn btn-default btn_closed">\
                        <span class="glyphicon glyphicon-wrench" style="color:#999;">\
                        </span>\
                     </span>\
          ');
          J$('#popup_ADD_config').before('\
              <div id="popup_ADD_test" class="modal-dialog">\
                 <div class="modal-content">\
                    <div class="modal-body">\
                       <table class="table table-condensed table-hover" style="margin-bottom:0px;">\
                           <thead><tr><th>DEBUG MODE</th><th></th></tr></thead>\
                           <tbody>\
                              <tr class="active">\
                                 <td>TEST1 - 채팅창에 imgur image 생성</td>\
                                 <td><span id="ADD_test_id_1" style="cursor:pointer;font-weight:bold;">TEST 1 실행</span></td>\
                              </tr>\
                              <tr class="active">\
                                 <td>TEST2 - 광고 차단 테스트</td>\
                                 <td><span id="ADD_test_id_2" style="cursor:pointer;font-weight:bold;">TEST 2 실행</span></td>\
                              </tr>\
                              <tr class="active">\
                                 <td>TEST3 - 데스크톱 알림</td>\
                                 <td><span id="ADD_test_id_3" style="cursor:pointer;font-weight:bold;">\
                                    button\
                                    </span></td>\
                              </tr>\
                              <tr class="active">\
                                 <td>TEST4 - link click test without function</td>\
                                 <td><span id="ADD_test_id_4" style="cursor:pointer;font-weight:bold;">\
                                    클릭\
                                    </span></td>\
                              </tr>\
                              <tr class="active">\
                                 <td>TEST5 - scroll trigger</td>\
                                 <td><span id="ADD_test_id_5" style="cursor:pointer;font-weight:bold;">\
                                    클릭\
                                    </span></td>\
                              </tr>\
                          </tbody>\
                       </table>\
                    </div>\
                 </div>\
              </div>\
          ');
      }
      
      // @
      var at_fix = J$('.footer').html().replace('@','<div id="at">@</div>')
      J$('.footer').html(at_fix);
      at_fix = null;
}


//////////////////////////////////////////////////////////////////////////////////
// test event
J$(document).on('click', '#ADD_test_id_1', function() {
    var test_text = '\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11"><span class="conversation_nick" nick="%uCF58%uC0D0%uC9F1%uC9F1%uB9E8">테스트맨</span><span style="vertical-align: middle;">&nbsp; </span><span class="cs_contents" style="">\
         테스트 http://i.imgur.com/7bzMRmqh.gif</span></div>';
    J$('.conversation_contents').append(test_text);
    test_text = null;
}); // http://imgur.com/a/cKXVX

J$(document).on('click', '#ADD_test_id_2', function() {
    var test_text = '\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11">\
            <span style="color:blue">[광고] </span>\
            <span class="cs_contents" style=""><a href="http://uchat.co.kr/uchat/click.php?id=92"> 광고문의 클릭 </a></span>\
        </div>';
    J$('.conversation_contents').append(test_text);
    test_text = null;
});

J$(document).on('click', '#ADD_test_id_3', function() {
    var noti_options = {
          title: 'title',
          options: {
            body: 'body',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
            lang: 'ko-KR'
          }
    };
    
    J$("#easyNotify").easyNotify(noti_options);
    noti_options = null;
});


J$(document).on('click', '#ADD_test_id_4', function() {
    var test_text = '\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11">\
            <span class="conversation_nick" nick="%uCF58%uC0D0%uC9F1%uC9F1%uB9E8">테스트맨1</span>\
            <span style="vertical-align: middle;">&nbsp; </span><span class="cs_contents" style="">테스트 <a href="http://imgur.com/a/cKXVX" target="_blank">http://imgur.com/a/cKXVX</a></span>\
        </div>\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11">\
            <span class="conversation_nick" nick="%uCF58%uC0D0%uC9F1%uC9F1%uB9E8">테스트맨2</span>\
            <span style="vertical-align: middle;">&nbsp; </span><span class="cs_contents" style="">테스트 <a href="http://www.dostream.com/#/stream/twitch/hanryang1125" target="_blank">http://www.dostream.com/#/stream/twitch/hanryang1125</a></span>\
        </div>\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11">\
            <span class="conversation_nick" nick="%uCF58%uC0D0%uC9F1%uC9F1%uB9E8">테스트맨3</span>\
            <span style="vertical-align: middle;">&nbsp; </span><span class="cs_contents" style="">한좌표 두개 링크 있는경우 <a href="http://www.dostream.com/#/stream/twitch/hanryang1125" target="_blank">http://www.dostream.com/#/stream/twitch/hanryang1125</a> <a href="http://www.dostream.com/#/stream/twitch/kimdoe" target="_blank">http://www.dostream.com/#/stream/twitch/gmdkdsla</a></span>\
        </div>\
        ';
    J$('.conversation_contents').append(test_text);
    test_text = null;
});

J$(document).on('click', '#ADD_test_id_5', function() {

});


//////////////////////////////////////////////////////////////////////////////////
// 현재 화면이 메인인지 하위 재생화면인지 체크함
// 메인인 경우 true를 리턴
function urlchecker()
{
    var document_url = location.href;
    document_url = document_url.toLowerCase();
    var stream_url = document_url.indexOf('#/stream/');
        if( stream_url  == -1 )
        {
        //ADD_DEBUG_MODE && console.log('urlchecker true');
        return true;
        }
    else
        {
        //ADD_DEBUG_MODE && console.log('urlchecker false');
        return false;
        }
}


//////////////////////////////////////////////////////////////////////////////////
// 좌표 보내기 버튼 DOE 생성하기 위한 함수
function ADD_send_location_DOE()
{
    var ADD_chat_window_id = J$('.conversation_contents'); //div.uchat_middle>div.input
    var ADD_send_location_button_id = J$('#ADD_send_location_button');
    var ADD_send_location_button_elem;
    
    ADD_DEBUG_MODE && console.log('ADD_chat_window_id.length = '+ADD_chat_window_id.length+' , ADD_send_location_button_id.length = '+ADD_send_location_button_id.length);
    // 채팅창 존재 여부 확인, 좌표 보내기 버튼 이미 존재하는지 확인
    if( (ADD_chat_window_id.length !== 0) && (ADD_send_location_button_id.length === 0) )
    {
        // 채팅창 생성
        ADD_send_location_button_elem = '\
            <div id="ADD_send_location_container">\
                <span id="ADD_send_location_notice"></span>\
                <span aria-label="현재 주소를 채팅 입력란에 복사" data-microtip-position="top-left" role="tooltip">\
                    <span id="ADD_send_location_button" class="glyphicon glyphicon-send"></span>\
                </span>\
            </div>';
        ADD_chat_window_id.after(ADD_send_location_button_elem);
    }
    
    ADD_chat_window_id = null;
    ADD_send_location_button_id = null;
    ADD_send_location_button_elem = null;
}


//////////////////////////////////////////////////////////////////////////////////
// 좌표 보내기 버튼 동작 관련 함수
function ADD_send_location()
{
    /*
    if(chat_send_location)
    {
        chat_send_location = false;
    }
    else
    {
        // 한번 좌표 쏘면 5초 기다려야 하는 기능 추가 시 사용.
    }
    */
    var ADD_send_location_notice_text = '';
    if( urlchecker() )
    {
        ADD_send_location_notice_text = '메인에서는 좌표를 복사할 수 없습니다';
    }
    else
    {
        ADD_send_location_notice_text = '좌표가 복사되었습니다.';
        J$('input.conversation').val(location.href).focus(); //.trigger(jQuery.Event('keypress', {keyCode: 13}))
    }
    J$('#ADD_send_location_notice').hide().html(ADD_send_location_notice_text).fadeIn('fast').delay(2000).fadeOut('fast');
}


//////////////////////////////////////////////////////////////////////////////////
// 멀티 트위치 버튼 생성 및 메인 목록 수정
function Addostram_run()
{
    return;
    // Add multitwitch button
    if( J$('#multitwitch').length === 0 )
          J$('.search').append('<span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span>');

    if(J$('.ADD_ON').length === 0)
    {
        if( J$('li.twitch').length > 0 )
        {
            ADD_DEBUG_MODE && console.log('Iteration no. is ',iteration);
            iteration = 0;
            // ADD_cookie_to_var();
            J$('li.twitch').each(function (j) {
            var href = J$(this).find('a').attr('href').replace('/#/stream/twitch/', '');
            J$(this).attr('id', 'twitch_'+ href).addClass('ADD_ON');
            });
    
            // Add choosed streamer from api cookie
            var ADD_config_alarm = ADD_config_ary.ADD_config_alarm;
            ADD_DEBUG_MODE && console.log('ADD_config_alarm: ',ADD_config_alarm );
    
            if ( ADD_config_alarm && (!!J$.Jcookie('twitch_api_cookie')) && (twitch_api_cookie.length>0) )
            {
               for(var w=0; w<twitch_api_cookie.length; w++)
               {
                   if( J$('#twitch_'+twitch_api_cookie[w].name).length === 0 )
                   {
                   streamerArray.push([twitch_api_cookie[w].name, twitch_api_cookie[w].display_name]);
                   var ADD_star_string = '<div style="position:relative;color:#333;"><div class="glyphicon glyphicon-star icon_star"></div></div>';
                   var ADD_li_string = '\
                      <li id="twitch_'+twitch_api_cookie[w].name+'" class="twitch">\
                         '+ADD_star_string+'\
                         <a href="/#/stream/twitch/'+twitch_api_cookie[w].name+'">\
                             <img src="http://static-cdn.jtvnw.net/previews-ttv/live_user_'+twitch_api_cookie[w].name+'-240x180.jpg" hieght="60" width="90">\
                             <div class="stream-wrap">\
                                 <div class="title">'+twitch_api_cookie[w].status+'</div>\
                                 <div class="info">\
                                     <div class="from twitch">'+twitch_api_cookie[w].name+'</div>\
                                     <div class="viewers">\
                                         <span class="glyphicon glyphicon-user"></span>\
                                           '+twitch_api_cookie[w].viewers+'\
                                     </div>\
                                 </div>\
                             </div>\
                         </a>\
                      </li>\
                    ';
        
                    J$('.main-streams>ul').prepend(ADD_li_string);
                   }
                }
            }
            
            
            // Fix choosed streamer on top
            var ADD_config_top_fix = ADD_config_ary.ADD_config_top_fix;
            var ADD_config_top_off_fix = ADD_config_ary.ADD_config_top_off_fix;
            
            ADD_DEBUG_MODE && console.log('Streamer fixed: ', ADD_config_top_fix);
            if ((!!J$.Jcookie('ADD_config_ary')) && ADD_config_top_fix && fixed_streamer.length >= 1){
                
                for(k = 0; k < fixed_streamer.length; k++){
                    var temp_streamer_href = fixed_streamer[fixed_streamer.length - k - 1].replace(' ', '');
                    var temp_streamer_id = '#'+'twitch_'+temp_streamer_href;
                    
                    var ADD_pushpin_string = '<div style="position:relative;"><div class="glyphicon glyphicon-pushpin icon_pushpin"></div></div>';
                    
                    if(!(J$(temp_streamer_id).length === 0))
                    {
                        J$(temp_streamer_id).addClass('fixed_streamer').prependTo('.main-streams>ul');
                        J$(temp_streamer_id).prepend(ADD_pushpin_string);
                    }
                    else if(ADD_config_top_off_fix)
                    {
                       var ADD_offline_string = '\
                          <li id="twitch_'+temp_streamer_href+'" class="twitch fixed_streamer">\
                             <a href="/#/stream/twitch/'+temp_streamer_href+'">\
                                 <img src="http://static-cdn.jtvnw.net/previews-ttv/live_user_'+temp_streamer_href+'-240x180.jpg" hieght="60" width="90">\
                                 <div class="stream-wrap">\
                                     <div class="title">스트림이 오프라인 상태이거나 메인에 없는 스트리머 추가 목록에 없습니다.</div>\
                                     <div class="info">\
                                         <div class="from twitch">'+temp_streamer_href+'</div>\
                                         <div class="viewers">\
                                             <span class="glyphicon glyphicon-user"></span>\
                                               0\
                                         </div>\
                                     </div>\
                                 </div>\
                             </a>\
                          </li>\
                        ';
                        J$('.main-streams>ul').prepend(ADD_offline_string).prepend(ADD_pushpin_string);
                    }
                }
            }
            
            // Remove choosed streamer
            var ADD_config_streamer_hide = ADD_config_ary.ADD_config_streamer_hide;
            ADD_DEBUG_MODE && console.log('Streamer hided: ', ADD_config_streamer_hide);
            
            for(var z=0;z<hide_streamer.length;z++)
            {
               J$('#twitch_'+hide_streamer[z].replace(' ', '')).hide();
            }
            
            
            // Search twitch li
            J$('li.twitch').each(function (i) {
                // get twitch id
                href = J$(this).find('a').attr('href').replace('/#/stream/twitch/', '');
                
                // twitch nickname
                for(i=0; i < streamerArray.length; i++){
                if (href==streamerArray[i][0])
                    {
                        streamerID=streamerArray[i][1]+' ';
                        break;
                    }
                }
                
                J$(this).find('.info>.from').html(streamerID+'('+href+')');
                J$(this).append('\
                    <div class="ADD_li_box_container">\
                        <div class="ADD_li_box">\
                            <div class="ADD_checkbox_container">\
                                <input class="ADD_checkbox" type="checkbox" name="chk" value="'+href+'" onfocus="this.blur()" />\
                            </div>\
                            <div class="multitwitch_button">\
                                <a href="/#/stream/multitwitch/'+href+'">\
                                    <span class="btn btn-default btn-xs">With chat</span>\
                                </a>\
                            </div>\
                        </div>\
                    </div>');
                streamerID = ''; // reset
                });
        }
        else
        {
            // 2017.07.08
            // 두스트림 자체 DOE 요소 생성되기 전에 함수 작동 시도한 경우 작동 안 하는 상황 방지
            // DOE 요소 탐색 실패 시 재귀호출로 본 함수를 10ms 간격으로 다시 호출한다.
            // 자바스크립트가 뻗는 것을 방지하기 위해 호출 횟수는 max_iteration(100) 미만으로 제한한다
            if (iteration < max_iteration)
            {
                setTimeout(
                   function() {
                      iteration = iteration + 1;
                      Addostram_run();
                   },10);
            }
            else
            {
                ADD_DEBUG_MODE && console.log('iteration = '+iteration+' , Could not find the li element');
                iteration = 0;
            }
        }
    }
    else
    {
        ADD_DEBUG_MODE && console.log('Addostram_run() 함수가 이미 동작하여 실행하지 않는다.');
    }
}


//////////////////////////////////////////////////////////////////////////////////
// 멀티트위치 버튼 동작 관련 함수
function multitwitch_run()
{
    multitwitchID = '';
    J$("input[name=chk]:checked").each(function() {
        if(multitwitchID==='')
           multitwitchID = J$(this).val();
        else
           multitwitchID = multitwitchID+'&'+J$(this).val();
    });
    //alert(multitwitchID);
    if(multitwitchID==='')
        alert('Check the checkboxs to use multitwitch!');
    else
        J$(location).attr('href','/#/stream/multitwitch/'+multitwitchID);
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                               FUNCTION - CHAT
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Imgur API 접근하여 이미지 정보 가져옴
function getImgurData(Imgur_ID, Imgur_type) {
  // Imgur_type --------------- 0 = image   ,    1 = album    ,    2 = gallery    ,    10 = etc
    var imgur_api_call_url = 'https://api.imgur.com/3/';
    var imgur_client_id = 'a57c643ca3a51ee';
    var imgur_return_link = '';
    
    if (Imgur_type==0)
        {
            imgur_api_call_url = imgur_api_call_url+'image/'+Imgur_ID;
        }
    else if (Imgur_type==1)
        {
            imgur_api_call_url = imgur_api_call_url+'album/'+Imgur_ID+'/images';
        }
    else if (Imgur_type==2)
        {
            imgur_api_call_url = imgur_api_call_url+'gallery/album/'+Imgur_ID;
        }
    else if (Imgur_type==10)
        {
            return false;
        }
  J$.ajax({
      url: imgur_api_call_url,
      async: false, // return 하기 위해 async 대신 sync를 false로 설정
      type: 'GET',
      //contentType: 'application/json',
      dataType:'json',
      headers: {
          'Authorization': 'Client-ID '+imgur_client_id
      },
    success:function(response) {
      ADD_DEBUG_MODE && console.log('Imgur api request succeed');
      var response_data = response.data;
      ADD_DEBUG_MODE && console.log(response);
      //ADD_DEBUG_MODE && console.log(response_data);
      if(response_data[0] !== undefined)
      {
          ADD_DEBUG_MODE && console.log('type:album',response_data[0].link);
          imgur_return_link = response_data[0].link;
      }
      else
      {
          ADD_DEBUG_MODE && console.log('type:image',response_data.link);
          imgur_return_link = response_data.link;
      }
      response_data = null;
      response = null;
    },
    error:function() {
        // request failed
        ADD_DEBUG_MODE && console.log('Imgur api request failed');
    }
  });
  
  if(Imgur_type==2)
  {
      // gallery 타입의 경우 album 주소를 가져오므로 해당 album 에 대하여 재호출한다.
      imgur_return_link = imgur_return_link.split('a')[1];
      if(imgur_return_link !== undefined && imgur_return_link !== null)
          imgur_return_link = getImgurData(imgur_return_link, 1);
  }
  
  return imgur_return_link;
}

//getImgurData('Vvb64B4', 0);
//getImgurData('Dvnw5', 1);
//var testimg = getImgurData('Tqhhv', 2);
//ADD_DEBUG_MODE && console.log('testimg = '+testimg);

//////////////////////////////////////////////////////////////////////////////////
// 채팅창에서 문자열 탐지, 이벤트 bind, API 함수 호출 동작 실행
function ADD_chatting_arrive(){
   // 기존에 꺼져있는 경우
    if(!chatting_arrive_check || chatting_arrive_check === null)
    {
        // True 이면 켠다.
        if (ADD_config_ary.ADD_config_chat_ctr){
            chatting_arrive_check = true;
            // 오로지 이 경우만 return 하지 않는다.
        }
        // 그 외의 경우 그냥 나간다.
        else
        {
            return;
        }
    }
    // 기존에 켜져있는 경우
    else
    {
        // False 이면 끈다.
        if(!ADD_config_ary.ADD_config_chat_ctr){
            J$(document).unbindArrive('.user_conversation');
            chatting_arrive_check = false;
            return;
        }
        // 그 외의 경우 그냥 나간다.
        else
        {
            return;
        }
    }
    
    // arrive bind 및 unbind
    if(chatting_arrive_check && ADD_config_ary.ADD_config_chat_ctr){
        // 설정이 변경되고 true 이면 false 에서 true로 바뀐 것이므로 bind 한다.
        J$(document).arrive('.user_conversation', function(newElem) {
            var newElem = J$(newElem);
            var ADD_chatting_nickname = newElem.find('.conversation_nick').html();
            var ADD_chatting_cs_content_elem = newElem.find('.cs_contents');
            var ADD_chatting_content = ADD_chatting_cs_content_elem.html();
            
            if(ADD_config_ary.ADD_config_chat_adb)
            {
                // if(ADD_chatting_content.indexOf('광고문의 클릭') !== -1 || ADD_chatting_content.indexOf('유챗2 스킨기능 오픈') !== -1)
                if( J$('span:first', newElem).html().replace(/\s/g,'') == '[광고]' )
                {
                    ADD_DEBUG_MODE && console.log('광고 메시지 감지됨!',ADD_chatting_content);
                    newElem.remove();
                }
            }
            
            // 메모하기
            // 메모용 쿠키 있는지 체크
            if (!!J$.Jcookie('ADD_chat_memo')){
                // 메모용 쿠키 있으면 읽어옴
                var ADD_chat_memo = JSON.parse(J$.Jcookie('ADD_chat_memo'));
                if(ADD_chatting_nickname in ADD_chat_memo)
                {
                    newElem.find('.conversation_nick').after('<span class="conversation_memo" style="color:red;font-weight:bold;"> ['+ADD_chat_memo[ADD_chatting_nickname]+']</span>');
                }
            }
            
            // Imgur image preview 시
            if(ADD_config_ary.ADD_config_imgur_preview)
            {
                var ADD_imgur_id;
                var ADD_imgur_type;
                var ADD_imgur_match;
                var ADD_imgur_link;
                var ADD_imgur_DOE_text;
                var ADD_imgur_safe_screen_opacity;
                var ADD_imgur_reg = /https?:\/\/(\w+\.)?imgur.com\/(a\/|gallery\/)?(\w*)+(\.[a-zA-Z]{3})?/;
                var conversation_contents_elem;
                
                //ADD_DEBUG_MODE && console.log('nickname: '+ADD_chatting_nickname+' , content: '+ADD_chatting_content);
                
                // 정규표현식을 통해 imgur 링크 포함 여부 확인, global check 하지 않고 먼저 나온 하나만 확인함
                // 대소문자 체크가 꼭 필요?
                // r, gallery type에 대한 체크가 필요?
                ADD_imgur_match = ADD_chatting_content.match(ADD_imgur_reg);
                
                if(ADD_imgur_match !== null)
                {
                    // 로컬 변수 선언
                    ADD_imgur_id = ADD_imgur_match[3];
        
                    // 이미지 type 체크
                    if(ADD_imgur_match[2] === undefined)
                    {
                        // a/ 에 대한 구문이 없는 경우 이미지임
                        ADD_imgur_type = 0;
                    }
                    else if( ADD_imgur_match[2] == 'a/' )
                    {
                        // a/ 에 대한 구문이 있는 경우 앨범임
                        ADD_imgur_type = 1;
                    }
                    else if( ADD_imgur_match[2] == 'gallery/' )
                    {
                        // 갤러리
                        ADD_imgur_type = 2;
                    }
                    else
                    {
                        ADD_imgur_type = 10;
                    }
        
                    // imgur api 호출
                    ADD_DEBUG_MODE && console.log('ADD_imgur_id = '+ADD_imgur_id+'  ADD_imgur_type = '+ADD_imgur_type);
                    ADD_imgur_link = getImgurData(ADD_imgur_id, ADD_imgur_type);
        
                    // imgur DOE 생성
                    if(ADD_config_ary.ADD_config_imgur_preview_safe)
                    {
                        // 클릭시 이미지 활성화 체크 시
                        ADD_imgur_safe_screen_opacity = Number(ADD_config_ary.ADD_config_imgur_preview_opacity);
                        if(ADD_imgur_safe_screen_opacity === undefined || ADD_imgur_safe_screen_opacity === null)
                            ADD_imgur_safe_screen_opacity = 0.93;
                        else if(ADD_imgur_safe_screen_opacity < 0 || ADD_imgur_safe_screen_opacity > 1)
                            ADD_imgur_safe_screen_opacity = 0.93;
                        
                        ADD_imgur_DOE_text = '\
                        <div class="imgur_container">\
                            <div class="imgur_safe_screen" style="opacity:' + ADD_imgur_safe_screen_opacity +';">\
                                <span class="imgur_safe_button btn btn-default align-middle">Image show</span>\
                            </div>\
                            <div class="imgur_control_button ADD_tr_10_10">\
                                <span class="imgur_control_hide glyphicon glyphicon-minus-sign"></span>\
                                <span class="imgur_control_remove glyphicon glyphicon-remove-sign"></span>\
                            </div>\
                            <div class="imgur_control_button ADD_br_10_10">\
                                <span class="imgur_control_hide glyphicon glyphicon-minus-sign"></span>\
                                <span class="imgur_control_remove glyphicon glyphicon-remove-sign"></span>\
                            </div>\
                            <a href="'+ADD_imgur_link+'" class="open-lightbox">\
                                <img src="'+ADD_imgur_link+'" class="imgur_image_in_chat" />\
                            </a>\
                        </div>';
                    }
                    else
                    {
                        // 클릭시 이미지 활성화 체크 안 할 시
                        ADD_imgur_DOE_text = '\
                        <div class="imgur_container">\
                            <div class="imgur_control_button_container">\
                                <div class="imgur_control_button ADD_tr_10_10">\
                                    <span class="imgur_control_remove glyphicon glyphicon-remove-sign"></span>\
                                </div>\
                            <div class="imgur_control_button ADD_br_10_10">\
                                <span class="imgur_control_remove glyphicon glyphicon-remove-sign"></span>\
                            </div>\
                            </div>\
                                <a href="'+ADD_imgur_link+'" class="open-lightbox">\
                                    <img src="'+ADD_imgur_link+'" class="imgur_image_in_chat" />\
                                </a>\
                        </div>';
                    }
                    
                    ADD_chatting_cs_content_elem.append(ADD_imgur_DOE_text);
                    
                    if( !(J$('.uchat_scroll').hasClass('uchat_scroll_clicked')) )
                    {
                        conversation_contents_elem = J$('.conversation_contents');
                        conversation_contents_elem.animate({ scrollTop: conversation_contents_elem.prop('scrollHeight')}, 'fast');
                    }
                }
    
                // GC
                ADD_imgur_id = null;
                ADD_imgur_type = null;
                ADD_imgur_match = null;
                ADD_imgur_link = null;
                ADD_imgur_DOE_text = null;
                ADD_imgur_safe_screen_opacity = null;
                conversation_contents_elem = null;
                ADD_imgur_reg = null;
            } // ADD_config_ary.ADD_config_imgur_preview 에 대한 if문 끝


            // 채팅 두스트림 좌표 클릭 시
            if(ADD_config_ary.ADD_config_url_self)
            {
                var ADD_chatting_cs_content_a_elem;
                var ADD_chatting_cs_content_a_elem_length;
                
                ADD_chatting_cs_content_a_elem = ADD_chatting_cs_content_elem.find('a');
                ADD_chatting_cs_content_a_elem_length = ADD_chatting_cs_content_a_elem.length;

                // a 태그를 가지고 있는 경우
                if(ADD_chatting_cs_content_a_elem_length !== 0)
                {
                    for (var i=0;i<ADD_chatting_cs_content_a_elem_length;i++)
                    {
                        var ADD_chatting_cs_content_a_href = ADD_chatting_cs_content_a_elem[i].href;
                        if(ADD_chatting_cs_content_a_href.indexOf('#/stream/') !== -1)
                            ADD_chatting_cs_content_a_elem[i].removeAttribute('target');
                        
                        ADD_chatting_cs_content_a_href = null;
                    }
                }
                
                // GC
                ADD_chatting_cs_content_a_elem = null;
                ADD_chatting_cs_content_a_elem_length = null;
            }
            
            chatting_arrive_check = true;
            
            // GC
            newElem = null;
            ADD_chatting_nickname = null;
            ADD_chatting_cs_content_elem = null;
            ADD_chatting_content = null;
        }); // chat 관련 arrive 끝
    } // else 끝
}


//////////////////////////////////////////////////////////////////////////////////
// 채팅창 시스템 메시지
function ADD_send_sys_msg(msg, delay){
    // ADD_config_ary.ADD_config_sys_meg &&
    if( J$('.conversation_contents').length !== 0 )
    {
        var conversation_contents_elem = J$('.conversation_contents');
        var msg_text = '<div class="system" title="Dosteam+ msg">'+msg+'</div>';
        if(delay === 0)
        {
            conversation_contents_elem.append(msg_text);
        }
        else
        {
            setTimeout(function() {
                conversation_contents_elem.append(msg_text);
            }, delay);
        }
        if( !(J$('.uchat_scroll').hasClass('uchat_scroll_clicked')) )
            conversation_contents_elem.animate({ scrollTop: conversation_contents_elem.prop('scrollHeight')}, '0');

        // GC
        conversation_contents_elem = null;
        msg_text = null;
    }
}


//////////////////////////////////////////////////////////////////////////////////
// 채팅창 휠감지
function ADD_chat_scroll_pause() {
    // 기존에 꺼져있는 경우
    if(!chatting_scroll_pause || chatting_scroll_pause === null)
    {
        // 둘 다 True 이면 켠다.
        if (ADD_config_ary.ADD_config_chat_scroll && ADD_config_ary.ADD_config_chat_ctr){
            chatting_scroll_pause = true;
            // 오로지 이 경우만 return 하지 않는다.
        }
        // 그 외의 경우 그냥 나간다.
        else
        {
            return;
        }
    }
    // 기존에 켜져있는 경우
    else
    {
        // 하나라도 False 이면 끈다.
        if(!ADD_config_ary.ADD_config_chat_scroll || !ADD_config_ary.ADD_config_chat_ctr){
            ADD_DEBUG_MODE && console.log('scroll 이벤트 off');
            J$(document).off('wheel.chatScrollFunc mousewheel.chatScrollFunc', '.conversation_contents');
            if( J$('#view_additional_message_container').length !== 0 ){
                J$('#view_additional_message_container').remove();
                J$('.uchat_scroll').trigger('click');
            }
            chatting_scroll_pause = false;
            return;
        }
        // 그 외의 경우 그냥 나간다.
        else
        {
            return;
        }
    }

    if(chatting_scroll_pause && ADD_config_ary.ADD_config_chat_scroll && ADD_config_ary.ADD_config_chat_ctr){
        ADD_DEBUG_MODE && console.log('scroll 이벤트 on');
        J$(document).on('wheel.chatScrollFunc mousewheel.chatScrollFunc', '.conversation_contents', function(event) {
            // 현재 스크롤 정지 상태 아닌 경우
            if( !(J$('.uchat_scroll').hasClass('uchat_scroll_clicked')) ){

                //마우스휠 위로 돌릴때 이벤트
                var scroll_val = -1;
                if (event.type == 'mousewheel') {
                    scroll_val = event.originalEvent.wheelDelta;
                }
                else if (event.type == 'wheel')
                {
                    scroll_val = event.originalEvent.deltaY * (-1);
                }
                if (scroll_val >= 0) {

                    // 세로 스크롤바가 있을 경우 처리
                    if( J$(".conversation_contents").get(0).scrollHeight > J$(".conversation_contents").innerHeight() ){

                        // 스크롤 정지
                        J$('.uchat_scroll').trigger('click');

                        // DOE 생성
                        J$('.conversation_contents').before('<div id="view_additional_message_container"><div id="view_additional_message">아래에서 추가 메시지를 확인하세요.</div></div>');
                    }
                    else
                    {
                        // 스크롤바가 없는 경우
                    }

                }

                else {
                    //마우스휠 아래로 돌릴때 이벤트
                }

            }

        });
    }
}

J$(document).on('click', '.uchat_scroll', function() {
  if( ADD_config_ary.ADD_config_chat_scroll ){
      if( (J$('.uchat_scroll').hasClass('uchat_scroll_clicked')) && J$('#view_additional_message_container').length !== 0 ){
          J$('#view_additional_message_container').remove();
      }
  }
});

J$(document).on('click', '#view_additional_message_container', function() {
  if( ADD_config_ary.ADD_config_chat_scroll ){
      if( (J$('.uchat_scroll').hasClass('uchat_scroll_clicked')) && J$('#view_additional_message_container').length !== 0 ){
          //J$('#view_additional_message_container').remove();
          J$('.uchat_scroll').trigger('click');
      }
  }
});



//////////////////////////////////////////////////////////////////////////////////
// Open Lightbox
J$(document).on('click', '.open-lightbox', function(e) {
  e.preventDefault();
  var image = J$(this).attr('href');
  J$('html').addClass('no-scroll');
  J$('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
});

// Close Lightbox
  J$(document).on('click', '.lightbox-opened', function() {
  J$('html').removeClass('no-scroll');
  J$('.lightbox-opened').remove();
});


////////////////////////////////////////////////////////////////////////////////
// thumbnail image hover event
function ADD_thumbnail_mouseover(){
    //
    if(thumbnail_check === ADD_config_ary.ADD_config_thumbnail_mouse)
    {
        // 이전 설정과 변경된 설정이 같으면 리턴한다.
        ADD_DEBUG_MODE && console.log('기존 thumb 이벤트 bind 설정과 같으므로 리턴한다');
        return;
    }
    else if ( (thumbnail_check === null) && (!ADD_config_ary.ADD_config_thumbnail_mouse) )
    {
        // 초기 조건이 False 이므로 리턴한다.
        ADD_DEBUG_MODE && console.log('초기 thumb 이벤트 설정이 False 이므로 리턴한다');
        return;
    }
    else
    {
        // 이전 설정과 변경된 설정이 다르면 Global 변수를 업데이트 한다.
        thumbnail_check = ADD_config_ary.ADD_config_thumbnail_mouse;
    }

    if(!thumbnail_check)
    {
        // 설정이 변경되고 false 이면 true 에서 false 로 바뀐 것이므로 off 한다.
        J$(document).off('mouseenter mouseleave', 'li.twitch>a>img, li.kakao>a>img, li.youtube>a>img');
        //J$(div.ADD_thumb_elem_container).remove();
    }
    else
    {
        J$(document).on({
            mouseenter: function() {
                var thumb_this = J$(this);
                var thumb_this_parent = thumb_this.parent('a');
                var thumb_size_class;

                switch(ADD_config_ary.ADD_config_thumbnail_size){
                    case '1':
                        // size : small
                        thumb_size_class = 'ADD_thumb_size_1';
                        break;
                    case '2':
                        // size : medium
                        thumb_size_class = 'ADD_thumb_size_2';
                        break;
                    case '3':
                        // size : large
                        thumb_size_class = 'ADD_thumb_size_3';
                        break;
                    default:
                        thumb_size_class = 'ADD_thumb_size_0';
                        // default
                        break;
                }
                
                if( thumb_this_parent.find('.ADD_thumb_elem_container').length === 0 )
                {
                    var ADD_thumb_href = thumb_this.attr('src');
                    
                    // check image size
                    switch(ADD_config_ary.ADD_config_thumbnail_size){
                        case '1':
                            // size : small
                            // 240 과 360 은 차이가 크지 않으므로 그냥 쓴다.
                            // ADD_thumb_href = ADD_thumb_href.replace('240x180','360x180');
                            break;
                        case '2':
                            // size : medium
                            ADD_thumb_href = ADD_thumb_href.replace('240x180','640x360');
                            break;
                        case '3':
                            // size : large
                            ADD_thumb_href = ADD_thumb_href.replace('240x180','1280x720');
                            break;
                        default:
                            // 아무 작업도 하지 않음
                            break;
                    }
                    
                    var ADD_thumb_elem_string = '\
                      <div class="ADD_thumb_elem_container">\
                          <div class="ADD_thumb_elem '+thumb_size_class+'">\
                              <img class="ADD_thumb_img" style="width:100%;height:100%;" src="'+ADD_thumb_href+'" />\
                          </div>\
                      </div>\
                        ';
                    thumb_this.after(ADD_thumb_elem_string);
                    thumb_this_parent.find('.ADD_thumb_elem_container').fadeIn('fast');
                }
                else
                {
                    thumb_this_parent.find('.ADD_thumb_elem_container').fadeIn('fast');
                }
                
                if( !(thumb_this_parent.find('.ADD_thumb_elem').hasClass(thumb_size_class)) ){
                    thumb_this_parent.find('.ADD_thumb_elem').removeClass('ADD_thumb_size_1 ADD_thumb_size_2 ADD_thumb_size_3 ADD_thumb_size_0').addClass(thumb_size_class);
                }
            },
            mouseleave:function() {
                var thumb_this = J$(this);
                var thumb_this_parent = thumb_this.parent('a');
                if( thumb_this_parent.find('.ADD_thumb_elem_container').length !== 0 )
                {
                    thumb_this_parent.find('.ADD_thumb_elem_container').fadeOut('fast');
                }
            }
        }, 'li.twitch>a>img, li.kakao>a>img, li.youtube>a>img');
    }
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                             FUNCTION - CHAT MEMO
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// 메모 메뉴 DOE 생성 함수
function ADD_memo_menu_doe(){
    if(!ADD_config_ary.ADD_config_chat_ctr)
        return;

    //var newElem = J$(newElem);
    if( J$('#do_memo_container').length !== 0 ){
        J$('#do_memo_container').remove();
    }

    J$('.user_menu').after('<div id="do_memo_container" style=""><div id="do_memo" style="position:relative;top:125px;left:0;width:112px;height:30px;padding:6px 5px;background-color:red;color:#fff;font-weight:bold;cursor:pointer;">메모하기</div></div>');
    var save_style = J$('.user_menu').attr('style');
    save_style = save_style+'position:absolute;z-index:1101;';
    J$('#do_memo_container').attr('style', save_style);
    J$('#do_memo').css('top', J$('.user_menu').height() );

    save_style = null;
}

// 메모 입력 DOE 생성 함수
function ADD_memo_doe(){
    if(!ADD_config_ary.ADD_config_chat_ctr)
        return;

    var memo_nick = J$('.user_nick > div').html();
    var memo_find = false;
    var memo_contents = '';
    var ADD_chat_memo;
    var memo_doe_text = '';

    // 메모용 쿠키 있는지 체크
    if (!J$.Jcookie('ADD_chat_memo')){
        // 메모용 쿠키 없으면 메모용 쿠키 새로 생성
        ADD_chat_memo = {'key' : 'value'};
        J$.Jcookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });
        ADD_DEBUG_MODE && console.log('메모 쿠키가 없어서 새로 생성');
    }
    else
    {
        // 메모용 쿠키 있으면 읽어옴
        ADD_chat_memo = JSON.parse(J$.Jcookie('ADD_chat_memo'));
        ADD_DEBUG_MODE && console.log('메모 쿠키 있어서 읽어옴');
    }
    // 메모용 쿠키에 아이디와 동일한 키값 있는지 검색함
    for(key in ADD_chat_memo)
    {
        if(key == memo_nick){
            memo_find = true;
            break;
        }
    }
    // 있으면 값을 불러와서 내용에 해당하는 변수에 저장함
    if(memo_find){
        memo_contents = ADD_chat_memo[memo_nick];
    }
    // 없으면 걍 기본값인 공백씀

    // 메모하기 위한 DOE 창 생성함
    // 필요요소: form, save button, close button(Right up x)
    J$('html').addClass('no-scroll');
    memo_doe_text = '\
        <div class="lightbox-opened">\
        <div class="memo_doe" style="position: absolute; top: 50%;left:50%; width: 400px; height:100px; margin-left:-200px; margin-top:-50px;">\
        <div style="width:400px;height:100px;cursor:default;" class="modal-content">\
        <div style="padding:5px 0;"><span style="font-weight:bold;color:red;font-size:14px;">'+memo_nick+'</span> 에 대하여 메모를 입력합니다.</div>\
        <input type="text" id="memo_textbox" style="width:80%;height:25px;font-size:13px;padding:1px 0 1px 3px;" class="" value="'+memo_contents+'"/>\
        <div style="padding:5px 0;"><span id="memo_ok" class="btn btn-default">SAVE</span></div>\
        </div>\
        <div id="memo_text_container" style="position:relative;top:10px;left:0px; width:400px;height:30px;font-size:12px;cursor:pointer;"><span id="memo_text" style="color:#fff">메모를 삭제하려면 모든 내용을 지우고 저장하세요.<br />저장하지 않고 나가려면 배경화면을 누르세요.</span></div>\
        </div>\
        </div>\
        ';
    J$('body').append(memo_doe_text);

    // 확인 버튼 누르면 DOE 창 내용을 쿠키에 씀

    memo_nick = null;
    memo_find = null;
    memo_contents = null;
    ADD_chat_memo = null;
    memo_doe_text = null;
}

function ADD_memo_save_event(){
    var memo_nick = J$('.user_nick > div').html();
    var memo_find = false;
    var memo_contents = '';
    var ADD_chat_memo;
    var memo_blank = false;
    
    // 메모용 쿠키 있는지 체크
    if (!J$.Jcookie('ADD_chat_memo')){
        // 메모용 쿠키 없으면 메모용 쿠키 새로 생성
        ADD_chat_memo = {'key' : 'value'};
        J$.Jcookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });
    }
    else
    {
        // 메모용 쿠키 있으면 읽어옴
        ADD_chat_memo = JSON.parse(J$.Jcookie('ADD_chat_memo'));
    }
    
    memo_contents = J$('#memo_textbox').val();
    if(memo_contents == '' || memo_contents == null){
        memo_blank = true;
    }

    // 메모 변수 수정
    ADD_chat_memo[memo_nick] = memo_contents;

    if(memo_blank){
        delete ADD_chat_memo[memo_nick];
    }

    // 메모 쿠키 저장
    J$.Jcookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });

    J$('#memo_text').fadeOut(200);
    setTimeout(function() {
        var memo_text_contents;
        console.log('memo_blank',memo_blank,'memo_contents',memo_contents);
        if(memo_blank){
            memo_text_contents = '메모 내용이 존재하지 않으므로 메모가 삭제되었습니다. <br />나가려면 배경화면을 누르세요.';
        }
        else
        {
            memo_text_contents = '메모가 저장되었으며 새로 올라오는 채팅부터 반영됩니다. <br />나가려면 배경화면을 누르세요.';
        }
        J$('#memo_text').html(memo_text_contents).fadeIn(200);

        memo_text_contents = null;
        memo_blank = null;
        memo_nick = null;
        memo_find = null;
        memo_contents = null;
        ADD_chat_memo = null;

    }, 200);

}

// 메모 DOE 생성 이벤트
J$(document).on('click', '#do_memo', function() {
    ADD_memo_doe();
});

// Memo 창 클릭해도 안 꺼지도록 이벤트
J$(document).on('click', '.memo_doe > .modal-content', function(e) {
    e.stopPropagation();
});

// 메모 저장 이벤트
J$(document).on('click', '#memo_ok', function() {
    ADD_memo_save_event();
});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    MAIN
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Check config cookie
ADD_main_config_cookie();


//////////////////////////////////////////////////////////////////////////////////
// Call Twitch api
twitch_api();
ADD_API_CALL_INTERVAL();


//////////////////////////////////////////////////////////////////////////////////
// Multiwindows checker
ADD_multiwindow_prevent();


///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// J$(document).ready /////////////////////////////
J$(document).ready(function()
{
    // CSS LOAD
    Addostream_CSS();

///////////////////////////////////////////////////////////////////////////////////
    // Hijacking
    // Firefox 의 경우
    if(web_browser === 'firefox')
    {
        newdsStream = function() {
          J$('.loader_container').fadeIn(200);
        	var d = this;
          ADD_DEBUG_MODE && console.log('dsStream hijacked');
        	this.reload = function() {
        		  parse_data_from_list(0);
        	};
        	J$('.loader_container').fadeOut(200);
          ADD_multitwitch_DOE();
        };
        unsafeWindow.dsStream = exportFunction (newdsStream, unsafeWindow);
        
        function newdostream(q) {
            q = q.split('/');
            switch(q[1]) {
                case "stream":
                    J$('header').addClass("onstream");
                    J$('#stream').addClass("onstream");
                    J$('.footer').hide();
                    page = "stream";
                    J$('#stream').load('/stream.php', {'from':q[2], 'chan':q[3]});
                break;
                default:
                    J$('header').removeClass("onstream");
                    J$('#stream').removeClass("onstream");
                    J$('.footer').show();
                    J$('#stream').load('/main2.php',function() {
                        page = new newdsStream();
                        page.reload();
                    });
                break;
            }
        }
        unsafeWindow.dostream = exportFunction (newdostream, unsafeWindow);
        
        J$(document).on('click', 'header .nav-brand, header .nav-brand_mod', function(e) {
            if( urlchecker() ) {
                page = new newdsStream();
                page.reload();
                ADD_multitwitch_DOE();
            }
        });
    }
    // 그 이외(Chrome 등)의 경우
    else// if(web_browser === 'chrome')
    {
        unsafeWindow.dsStream = function() {
            J$('.loader_container').fadeIn(200);
          	var d = this;
            ADD_DEBUG_MODE && console.log('dsStream hijacked');
          	this.reload = function() {
          		  parse_data_from_list(0);
          	};
          	J$('.loader_container').fadeOut(200);
            ADD_multitwitch_DOE();
        };
        
        J$(document).on('click', 'header .nav-brand, header .nav-brand_mod', function(e) {
            if( urlchecker() ) {
                page = new dsStream();
                page.reload();
                ADD_multitwitch_DOE();
            }
        });
    }


//////////////////////////////////////////////////////////////////////////////////
    // Arrive event 관련
    // 채팅창 생길 때 send 위한 DOE 생성, 무조건 실행됨
    J$('.chat').arrive('.uchat_middle', function() { //{onceOnly:true},
        ADD_send_location_DOE();
        J$('.user_menu').attr('id','user_menu_id');

        
//////////////////////////////////////////////////////////////////////////////////
    // Memo event 관련
    // 추후 부하를 줄이기 위하여 ADD_config_ary.ADD_config_chat_ctr 에 따라 bind/unbind 한다.
        // display:none 감지
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if( !J$(mutations[0].target).is(':visible') )
                    if( J$('#do_memo_container').length !== 0 ){
                        J$('#do_memo_container').remove();
                        console.log('test');
                    }
            });
        });
        // display:none 감지 할당
        var target = document.getElementById('user_menu_id');
        observer.observe(target, { attributes : true, attributeFilter : ['style'] });
        // display:none 감지 끝

    });

    J$(document).arrive('.user_nick', function() {
        ADD_memo_menu_doe();
    });


});



//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// J$(document).load /////////////////////////////
window.addEventListener ("load", function()
{
    // Create Config DOE
    ADD_config_DOE();

    // Write config form from cookie
    ADD_var_to_config_form();
    
    // Change Logo class name
    J$('.nav-brand').removeClass('nav-brand').addClass('nav-brand_mod');
  
    // Create Multitwitch button DOE
    ADD_multitwitch_DOE();

    // Create Loading DOE
    J$('.nav-brand_mod').empty().append('<div class="loader_container" style="display:none;"><div class="loader"></div></div>');
    
});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    EVENT
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// run Multitwitch
J$(document).on('click', '#multitwitch', function(){
  multitwitch_run();
});


//////////////////////////////////////////////////////////////////////////////////
// hash change event
// 2017.07.09
// Backbutton 으로 인한 오류 방지
// li 클릭하여 재생 중 화면으로 올 경우 backbutton_checker 는 true 가 된다.
// 혹은 주소로 바로 갈 경우에도 동일하다.
// 페이지 변경을 탐지한 뒤, 백버튼 체킹되고 메인페이지인 경우 Addostram_run 함수 작동시킨다.
/*
window.onpopstate = function(event) {
    ADD_DEBUG_MODE && console.log('url checker = ', urlchecker());
    //ADD_DEBUG_MODE && console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if( backbutton_checker && urlchecker() ) //(!J$('#stream').hasClass('onstream')) )
    {
        ADD_DEBUG_MODE && console.log("Back button dectected. " + "location: " + document.location);
        ADD_DEBUG_MODE && console.log('window.onpopstate event 에서 ADD_cookie_to_var() 실행됨');
        ADD_cookie_to_var();
        twitch_api();
        Addostram_run();
        backbutton_checker = false;
    }
};
*/



//////////////////////////////////////////////////////////////////////////////////
// quick list popup On-Off event
J$(document).on('click', '#ADD_quick_list', function() {
    if (J$('#ADD_quick_list').hasClass('btn_closed'))
    {
        parse_data_from_list(1);
        J$('#popup_ADD_quick').stop(true,true).fadeIn(300);
        J$('#ADD_quick_list').removeClass('btn_closed').addClass('btn_opend');
    }
    else
    {
        J$('#popup_ADD_quick').stop(true,true).fadeOut(300);
        J$('#ADD_quick_list').removeClass('btn_opend').addClass('btn_closed');
    }
});

J$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream, #popup_ADD_quick', function() {
    if (J$('#ADD_quick_list').hasClass('btn_opend'))
    {
        J$('#popup_ADD_quick').stop(true,true).fadeOut(300);
        J$('#ADD_quick_list').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// config popup On-Off event
J$(document).on('click', '#ADD_config', function() {
    if (J$('#ADD_config').hasClass('btn_closed'))
    {
        ADD_var_to_config_form();
        J$('#popup_ADD_config').stop(true,true).fadeIn(300);
        J$('#ADD_config').removeClass('btn_closed').addClass('btn_opend');
        //ADD_DEBUG_MODE && console.log('config popup open');
    }
    else
    {
        J$('#popup_ADD_config').stop(true,true).fadeOut(300);
        J$('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
        //ADD_DEBUG_MODE && console.log('config popup close');
    }
});

J$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream', function() {
    if (J$('#ADD_config').hasClass('btn_opend'))
    {
        J$('#popup_ADD_config').stop(true,true).fadeOut(300);
        J$('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// DEBUG popup On-Off event
J$(document).on('click', '#ADD_test_button', function() {
    if (J$('#ADD_test_button').hasClass('btn_closed'))
    {
        J$('#popup_ADD_test').stop(true,true).fadeIn(300);
        J$('#ADD_test_button').removeClass('btn_closed').addClass('btn_opend');
        //ADD_DEBUG_MODE && console.log('DEBUG popup open');
    }
    else
    {
        J$('#popup_ADD_test').stop(true,true).fadeOut(300);
        J$('#ADD_test_button').removeClass('btn_opend').addClass('btn_closed');
        //ADD_DEBUG_MODE && console.log('DEBUG popup close');
    }
});

J$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream', function() {
    if (J$('#ADD_test_button').hasClass('btn_opend'))
    {
        J$('#popup_ADD_test').stop(true,true).fadeOut(300);
        J$('ADD_test_button').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// Save cookie event

J$(document).on('click', '#ADD_config_save', function() {
    ADD_save_config_to_cookie();

    ADD_DEBUG_MODE && console.log('ADD_config_save event 에서 ADD_cookie_to_var() 실행됨');
    ADD_cookie_to_var();

    if (local_api_refresh === true)
    {
        local_api_refresh = false;
        api_push_forced = true;

        twitch_api();
        ADD_API_CALL_INTERVAL();
        setTimeout(function() {
        local_api_refresh = true;
        }, 5000);
    }
    
    
    // 설정 팝업 알림 영역 표시
    J$('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');
});


//////////////////////////////////////////////////////////////////////////////////
// reset cookie event
J$(document).on('click', '#Cookie_reset', function() {
    ADD_cookie_var_initialize();
    ADD_config_cookie_remove();
    ADD_main_config_cookie();
    ADD_DEBUG_MODE && console.log('reset cookie event 에서 ADD_cookie_to_var() 실행됨');
    ADD_cookie_to_var();
    ADD_var_to_config_form();
    


    // 설정 팝업 알림 영역 표시
    J$('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');
    ADD_DEBUG_MODE && console.log('cookie reset!');
});


//////////////////////////////////////////////////////////////////////////////////
// Checkbox click event
// 체크박스가 체크되면 멀티트위치 버튼을 강조표시한다.
    J$(document).on('change','input[name=chk]',function(){
        if( J$('#multitwitch').hasClass('multitwitch_ready') )
            J$('#multitwitch').removeClass('multitwitch_ready');
        
        if(J$('input[name=chk]:checked').length >= 1)
        {
            setTimeout(
                function() {
                    J$('#multitwitch').addClass('multitwitch_ready');
                },
                100);
        }
    });


//////////////////////////////////////////////////////////////////////////////////
// config form click event
function ADD_config_enable(id)
{
/*
    for(var i=0;i<id.length;i++)
    {
        var id_elem = J$('#'+id[i]);
        if(id_elem.length === 0)
            continue;
        
        var form_class = '.'+id_elem.attr('id')+'_form';
        var class_elem = J$(form_class);
        if(class_elem.length === 0)
            continue;
        
        if(id_elem.is(':checked'))
            class_elem.prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
        else
            class_elem.prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    }
*/
    
    var id_elem = [];
    var form_class = [];
    var class_elem = [];
    
    // 먼저 전부 켠다.
    for(var i=0;i<ADD_config_enable_init.length;i++)
    {
        id_elem[i] = J$('#'+ADD_config_enable_init[i]);
        if(id_elem[i].length === 0)
            continue;
        
        form_class[i] = '.'+id_elem[i].attr('id')+'_form';
        class_elem[i] = J$(form_class[i]);
        if(class_elem[i].length === 0)
            continue;
        else
            class_elem[i].prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
    }
    
    // 체크 안 된 것을 끈다.
    for(var i=0;i<ADD_config_enable_init.length;i++)
    {
        if( !(id_elem[i].is(':checked')) )
            class_elem[i].prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    }
}


for(var i=0;i<ADD_config_enable_init.length;i++)
{
    (function(id) {
    J$(document).on('click', '#'+id, function() {
        // ADD_DEBUG_MODE && console.log(id);
        ADD_config_enable([id]);
    });
    })(ADD_config_enable_init[i]);
}


//////////////////////////////////////////////////////////////////////////////////
// imgur click event
J$(document).on('click', '.imgur_safe_button', function() {
    J$(this).parent('.imgur_safe_screen').fadeOut(500);
});
J$(document).on('click', '.imgur_control_hide', function() {
    console.log('- clicked');
    J$(this).closest('.imgur_container').find('.imgur_safe_screen').fadeTo(500, 0.93);
});
J$(document).on('click', '.imgur_control_remove', function() {
    console.log('x clicked');
    J$(this).closest('.imgur_container').hide();
});

// scroll lock click event
J$(document).on('click', '.uchat_scroll', function() {
    J$(this).toggleClass('uchat_scroll_clicked');
});





// send location click event
J$(document).on('click', '#ADD_send_location_button', function() {
    ADD_send_location();
});


//////////////////////////////////////////////////////////////////////////////////
// dev on click event
J$(document).on('click', '#ADD_config_dev_on', function() {
    if( true ) // ADD_config_ary.ADD_config_dev_on, 체크 여부와 상관 없이 볼 수 있다.
    {
        if( J$('#ADD_config_dev_on:checked').is(':checked') )
        {
            J$('.ADD_under_dev').show();
        }
        else
        {
            J$('.ADD_under_dev').hide();
        }
    }
});

J$(document).on('click', '#at', function() {
    SIGONGJOA();
});


//////////////////////////////////////////////////////////////////////////////////
function SIGONGJOA()
{
J$('body').append('<div class="sigong"><div class="sigong_detail1"></div><div class="sigong_detail2"></div></div><div class="hos"></div><div style="display: none;"><audio autoplay="true" controls="" class="attach_audio" src="http://cdh0912.github.io/assets/files/시공의 폭풍은 정말 최고야.mp3" type="audio/mpeg"></audio><audio autoplay="true" controls="" class="attach_audio" src="http://cdh0912.github.io/assets/files/시공좋아시공좋아.mp3" type="audio/mpeg"></audio></div>');
J$('head').append('\
    <style id="addostreamCSS" rel="stylesheet" type="text/css">\
        .iframeclass {position: absolute; top: 0; left: 0; width:100%; height:100%;}\
        @keyframes shake {\
        	2% {\
        		transform: translate(-0.5px, -0.5px) rotate(0.5deg); }\
        	4% {\
        		transform: translate(2.5px, -1.5px) rotate(-0.5deg); }\
        	6% {\
        		transform: translate(2.5px, 0.5px) rotate(1.5deg); }\
        	8% {\
        		transform: translate(-0.5px, 2.5px) rotate(-0.5deg); }\
        	10% {\
        		transform: translate(1.5px, -0.5px) rotate(1.5deg); }\
        	12% {\
        		transform: translate(0.5px, -1.5px) rotate(-0.5deg); }\
        	14% {\
        		transform: translate(0.5px, -1.5px) rotate(0.5deg); }\
        	16% {\
        		transform: translate(-0.5px, 0.5px) rotate(0.5deg); }\
        	18% {\
        		transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\
        	20% {\
        		transform: translate(-0.5px, -1.5px) rotate(-0.5deg); }\
        	22% {\
        		transform: translate(1.5px, 1.5px) rotate(0.5deg); }\
        	24% {\
        		transform: translate(-1.5px, 2.5px) rotate(1.5deg); }\
        	26% {\
        		transform: translate(-0.5px, 0.5px) rotate(0.5deg); }\
        	28% {\
        		transform: translate(-1.5px, 1.5px) rotate(-0.5deg); }\
        	30% {\
        		transform: translate(1.5px, 0.5px) rotate(0.5deg); }\
        	32% {\
        		transform: translate(1.5px, -0.5px) rotate(0.5deg); }\
        	34% {\
        		transform: translate(2.5px, 1.5px) rotate(-0.5deg); }\
        	36% {\
        		transform: translate(-1.5px, -0.5px) rotate(-0.5deg); }\
        	38% {\
        		transform: translate(1.5px, 2.5px) rotate(-0.5deg); }\
        	40% {\
        		transform: translate(-0.5px, -1.5px) rotate(0.5deg); }\
        	42% {\
        		transform: translate(0.5px, 0.5px) rotate(0.5deg); }\
        	44% {\
        		transform: translate(1.5px, 1.5px) rotate(-0.5deg); }\
        	46% {\
        		transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\
        	48% {\
        		transform: translate(1.5px, 1.5px) rotate(1.5deg); }\
        	50% {\
        		transform: translate(0.5px, -0.5px) rotate(0.5deg); }\
        	52% {\
        		transform: translate(-0.5px, 0.5px) rotate(1.5deg); }\
        	54% {\
        		transform: translate(1.5px, -1.5px) rotate(0.5deg); }\
        	56% {\
        		transform: translate(-0.5px, -1.5px) rotate(1.5deg); }\
        	58% {\
        		transform: translate(2.5px, 1.5px) rotate(0.5deg); }\
        	60% {\
        		transform: translate(-0.5px, -0.5px) rotate(1.5deg); }\
        	62% {\
        		transform: translate(1.5px, 2.5px) rotate(-0.5deg); }\
        	64% {\
        		transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\
        	66% {\
        		transform: translate(2.5px, 1.5px) rotate(-0.5deg); }\
        	68% {\
        		transform: translate(2.5px, 0.5px) rotate(1.5deg); }\
        	70% {\
        		transform: translate(-1.5px, -1.5px) rotate(0.5deg); }\
        	72% {\
        		transform: translate(-1.5px, -0.5px) rotate(-0.5deg); }\
        	74% {\
        		transform: translate(-0.5px, -1.5px) rotate(1.5deg); }\
        	76% {\
        		transform: translate(1.5px, 1.5px) rotate(0.5deg); }\
        	78% {\
        		transform: translate(1.5px, -0.5px) rotate(1.5deg); }\
        	80% {\
        		transform: translate(-0.5px, 1.5px) rotate(1.5deg); }\
        	82% {\
        		transform: translate(2.5px, 2.5px) rotate(0.5deg); }\
        	84% {\
        		transform: translate(-0.5px, 0.5px) rotate(1.5deg); }\
        	86% {\
        		transform: translate(1.5px, -0.5px) rotate(1.5deg); }\
        	88% {\
        		transform: translate(2.5px, -1.5px) rotate(0.5deg); }\
        	90% {\
        		transform: translate(0.5px, -1.5px) rotate(-0.5deg); }\
        	92% {\
        		transform: translate(-0.5px, -1.5px) rotate(1.5deg); }\
        	94% {\
        		transform: translate(2.5px, 0.5px) rotate(1.5deg); }\
        	96% {\
        		transform: translate(-0.5px, -1.5px) rotate(-0.5deg); }\
        	98% {\
        		transform: translate(-0.5px, -1.5px) rotate(0.5deg); }\
        	0%, 100% {\
        		transform: translate(0, 0) rotate(0); } }\
        @keyframes shake-little {\
        	2% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	4% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	6% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	8% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	10% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	12% {\
        		transform: translate(0px, 2px) rotate(0.5deg); }\
        	14% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	16% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	18% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	20% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	22% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	24% {\
        		transform: translate(0px, 2px) rotate(0.5deg); }\
        	26% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	28% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	30% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	32% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	34% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	36% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	38% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	40% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	42% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	44% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	46% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	48% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	50% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	52% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	54% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	56% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	58% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	60% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	62% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	64% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	66% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	68% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	70% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	72% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	74% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	76% {\
        		transform: translate(0px, 2px) rotate(0.5deg); }\
        	78% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	80% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	82% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	84% {\
        		transform: translate(0px, 0px) rotate(0.5deg); }\
        	86% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	88% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	90% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	92% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	94% {\
        		transform: translate(2px, 0px) rotate(0.5deg); }\
        	96% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	98% {\
        		transform: translate(2px, 2px) rotate(0.5deg); }\
        	0%, 100% {\
        		transform: translate(0, 0) rotate(0); } }\
        @keyframes spin {\
        	0% { transform: rotate(0deg); }\
        	0.1% { transform: rotate(-60deg); }\
        	0.2% { transform: rotate(-144deg); }\
        	0.25% { transform: rotate(-252deg); }\
        	0.3% { transform: rotate(-396deg); }\
        	0.35% { transform: rotate(-576deg); }\
        	0.4% { transform: rotate(-792deg); }\
        	0.45% { transform: rotate(-1152deg); }\
        	0.5% { transform: rotate(-1632deg); }\
        	0.6% { transform: rotate(-2352deg); }\
        	0.7% { transform: rotate(-4012deg); }\
        	2.1% { transform: rotate(-56856deg); }\
        	2.2% { transform: rotate(-58514deg); }\
        	2.3% { transform: rotate(-59234deg); }\
        	2.4% { transform: rotate(-59703deg); }\
        	2.5% { transform: rotate(-60063deg); }\
        	2.6% { transform: rotate(-60279deg); }\
        	2.7% { transform: rotate(-60603deg); }\
        	2.8% { transform: rotate(-60711deg); }\
        	100% { transform: rotate(-82656deg); }\
        }\
        @keyframes scale-up {\
        	0% { transform: scale(0.5); }\
        	0.5% { transform: scale(0.5); }\
        	1% { transform: scale(2.5); }\
        	1.7% { transform: scale(2.5); }\
        	2.0% { transform: scale(0.5) translate(200px,-200px); }\
        	100% {	}\
        }\
        @keyframes remove-border {\
        	0% {	}\
        	1% {\
        		border-color: rgba(255,255,255,0);\
        		background-color: rgba(255,255,255,0);\
        	}\
        	100% {	}\
        }\
        @keyframes fall-header {\
        	0% {\
        		top: 0;\
        	}\
        	0.6% {\
        		opacity: 1;\
        	}\
        	0.7% {\
        		top: 350px;\
        		transform: scale(0) perspective(450px) rotateY(155deg) rotateZ(100deg);\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-sharemenu {\
        	0% {}\
        	0.5% {\
        		transform: translate(-100%,0%) rotate(-270deg) scale(0.2);\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-search_box {\
        	0% {}\
        	0.4% {\
        		transform: translate(-10%,-500%) rotate(400deg) scale(0);\
        		opacity: 1;\
        	}\
        	0.45% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-list_btn_top_right {\
        	0% {}\
        	0.5% {\
        		transform: translate(45vw,212px) rotate(180deg) scale(0.2);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-list_btn_top_left {\
        	0% {}\
        	0.5% {\
        		transform: translate(-45vw,212px) rotate(180deg) scale(0.2);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-list_btn_bottom_right {\
        	0% {}\
        	0.5% {\
        		transform: translate(45vw,-212px) rotate(180deg) scale(0.2);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-list_btn_bottom_left {\
        	0% {}\
        	0.5% {\
        		transform: translate(-45vw,-312px) rotate(180deg) scale(0.2);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-cafemenu {\
        	0% {}\
        	0.7% {\
        		transform: translate(44vw,-2%) rotate(345deg) scale(0.05);\
        		opacity: 1;\
        	}\
        	0.75% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-commentDiv {\
        	0% {}\
        	1% {\
        		transform: translate(-6vw,-8vw) rotateX(230deg) rotateY(240deg) scale(0.05);\
        		opacity: 1;\
        		transform-origin: top;\
        	}\
        	1.1% {\
        		opacity: 0;\
        	}\
        	100% { opacity: 0; }\
        }\
        @keyframes fall-subject {\
        	0% {}\
        	0.5% {\
        		transform: translate(45vw,190px) rotate(50deg) scale(0.4);\
        		transform-origin: right;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-writer {\
        	0% {}\
        	0.5% {\
        		transform: translate(40vw,180px) rotate(-60deg) scale(0.4);\
        		transform-origin: right;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-url {\
        	0% {}\
        	0.5% {\
        		transform: translate(45vw,180px) rotate(-45deg) scale(0.2);\
        		transform-origin: right;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-comment_cnt {\
        	0% {}\
        	0.5% {\
        		transform: translate(40vw,-82px) rotate(180deg) scale(0.2);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-ccl {\
        	0% {}\
            0.3% {\
        		transform: rotate(35deg) translate(-10vw,30%) scale(0.8);\
        		transform-origin: left;\
        		opacity: 1;\
        	}\
        	0.5% {\
        		transform: rotate(55deg) translate(-20vw,60%) scale(0.3);\
        		transform-origin: left;\
        		opacity: 0.8;\
        	}\
        	0.52% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes appear-hos {\
        	0% {	}\
        	0.04% { opacity: 1; }\
        	100% { opacity: 1; }\
        }\
        @keyframes fall-paging {\
        	0% {	}\
        	0.5% {\
        		transform: rotate(-45deg) translate(7vw,-400px) scale(0.5);\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        @keyframes fall-minidaum {\
        	0% {	}\
        	0.5% {\
        		transform: rotate(-48deg) translate(-25vw) scale(0.5);\
        		opacity: 1;\
        	}\
        	0.55% {\
        		opacity: 0;\
        	}\
        	100% {\
        		opacity: 0;\
        	}\
        }\
        html {\
        	animation-name: shake;\
        	animation-duration: 100ms;\
        	animation-timing-function: ease-in-out;\
        	animation-iteration-count: 190;\
        	animation-delay: 6.5s;\
        }\
        body {\
        	animation-name: shake-little;\
        	animation-duration: 100ms;\
        	animation-timing-function: ease-in-out;\
        	animation-iteration-count: 245;\
        	animation-delay: 0s;\
        }\
        .open_article {\
        	display:none;\
        }\
        .bbs_contents {z-index: 0;}\
        #header {\
        	z-index: 2000;\
        }\
        #title, .wrap {\
        	overflow: visible;\
        	animation: 1000s fall-header ease-out 8.5s;\
        }\
        #shareMenu { z-index: 2000 }\
        #shareMenu > * {\
        	animation: 1000s fall-sharemenu cubic-bezier(0.85, 0.18, 1, 1.01) 7s;\
        	z-index: 2000;\
        }\
        .multitwitch_button {\
        	animation: 1000s fall-search_box ease 6s;\
        }\
        .twitch, .kakao, .youtube {\
        	animation: 1000s fall-list_btn_top_right cubic-bezier(0.85, 0.18, 1, 1.01) 9s;\
        	z-index: 2000;\
        }\
        .ADD_checkbox_container {\
        	animation: 1000s fall-list_btn_top_left cubic-bezier(0.85, 0.18, 1, 1.01) 7s;\
        	z-index: 2000;\
        }\
        li a img {\
        	animation: 1000s fall-list_btn_bottom_right cubic-bezier(0.85, 0.18, 1, 1.01) 7s;\
        	z-index: 2000;\
        }\
        .uchat_scroll, .count span,  .count span span, .setting_icon, .large_check {\
        	animation: 1000s fall-list_btn_bottom_left cubic-bezier(0.85, 0.18, 1, 1.01) 7s;\
        	z-index: 2000;\
        }\
        .checkbox, .multitwitch {\
        	animation: 1000s fall-cafemenu linear 8s;\
        	z-index: 2000;\
        }\
        .title {\
        	animation: 1000s fall-commentDiv linear 10s;\
        	z-index: 2001;\
        }\
        .nav-brand, .nav-brand_mod {\
        	animation: 1000s fall-subject linear 7s;\
        	z-index: 2000;\
        }\
        .AD_title, .checkbox, #multitwitch {\
        	animation: 1000s fall-writer linear 8s;\
        	z-index: 2000;\
        }\
        .from, .multitwitch_button {\
        	animation: 1000s fall-url linear 7s;\
        	z-index: 2000;\
        }\
        .footer {\
        	animation: 1000s fall-comment_cnt linear 9s;\
        	z-index: 2000;\
        }\
        .chat-container, .info, .search ul li div{\
        	animation: 1000s fall-ccl linear 11s;\
        	z-index: 2000;\
        }\
        .info, .search ul li div{\
        	animation: 1000s fall-ccl linear 7s;\
        	z-index: 2000;\
        }\
        .input {\
        	animation: 1000s remove-border linear 10s;\
        }\
        .footer  {\
        	animation: 1000s fall-paging linear 8s;\
        	z-index: 2000;\
        }\
        .chat-btns button {\
        	animation: 1000s fall-minidaum linear 10s;\
        	z-index: 2000;\
        }\
        .sigong div {\
        	width: 300px; height:300px;\
        	min-width: 300px;\
        	top: 0; left: 0;\
        	background-size: contain;\
        	background-position: center;\
        	background-repeat: no-repeat;\
        }\
        .sigong .sigong_detail1 {\
        	position: absolute;\
        	//background-image: url("http://cfile263.uf.daum.net/image/2120C1435920967129707D");\
            background-image: url("http://i.imgur.com/pIIwR9c.png");\
        }\
        .sigong .sigong_detail2 {\
        	//background-image: url("http://cfile290.uf.daum.net/image/2720604359209677295E2D");\
            background-image: url("http://i.imgur.com/k52hCin.png");animation: spin 1000s linear infinite;\
        }\
        #user_contents {overflow: visible !important;}\
        .hos {\
        	//background-image: url("http://cfile278.uf.daum.net/image/2124B4435920967229A02D");\
            background-image: url("http://i.imgur.com/Ur5t9G5.png");background-size: contain;background-position: center;\
        }\
        audio {visibility: hidden;}\
        @media screen and (min-width: 480px) {		/* vw>480px */\
        	.sigong {position: absolute;top:300px;right: 50%;margin-top: -100px;animation: scale-up 1000s linear infinite;z-index: 1000;margin-right: -105px;}\
        	.hos {opacity: 0;animation: 1000s appear-hos linear 20s;top:300px;width: 708px;height: 700px;position: absolute;right: 50%;margin-top: -338px;margin-right: -360px;}\
        }\
        @media screen and (max-width: 480px) { /* vw<480px */  @keyframes scale-up {   0% { transform: scale(0.5); }   0.5% { transform: scale(0.5); }   1% { transform: scale(1.2); }   2% { transform: scale(1.2); }   2.5% { transform: scale(0.21) translate(33%,-47%) }   100% { }  }  @keyframes mobile_comment1 {   0% {}   0.5% {     transform: translate(0,-100px) scale(0.4) rotate(-225deg);    opacity: 1;   }   0.55% { opacity: 0;    }   100% {}  }  @keyframes mobile_comment2 {   0% {}   0.5% {     transform: translate(0,-200px) scale(0.4) rotate(-45deg);    opacity: 1;   }   0.55% { opacity: 0;    }   100% {}  }  @keyframes mobile_comment3 {   0% {}   0.5% {     transform: translate(0,-300%) scale(0.4) rotate(70deg);    opacity: 1;   }   0.55% { opacity: 0;    }   100% {}  }  @keyframes mobile_comment4 {   0% {}   0.5% {     transform: translate(0,-400%) scale(0.4) rotate(-80deg);    opacity: 1;   }   0.55% { opacity: 0;    }   100% {}  }  @keyframes mobile_comment5 {   0% {}   0.5% {     transform: translate(0,-500%) scale(0.4) rotate(200deg);    opacity: 1;   }   0.55% { opacity: 0;    }   100% {}  }  @keyframes mobile_subject {   0% {}   1% {     transform: translate(0,250px) scale(0.2) rotateX(60deg) rotateY(60deg) rotateZ(360deg);    opacity: 1;   }   1.05% { opacity: 0;    }   100% {}  }  @keyframes mobile_navi {   0% {}   0.6% {     transform: translate(0,350px) scale(0.5) rotate(-145deg);    opacity: 1;   }   0.65% { opacity: 0;    }   100% {}  }  @keyframes mobile_tabcafe {   0% {}   0.6% {     transform: translate(0,-100px) scale(0.2) rotate(-145deg);    opacity: 1;   }   0.65% { opacity: 0;    }   100% {}  }  @keyframes mobile_optionbtn1 {   0% {}   0.6% {     transform: translate(-65px,-10px) scale(0.5);    opacity: 1;   }   0.65% { opacity: 0;    }   100% {}  }  @keyframes mobile_optionbtn2 {   0% {}   0.6% {     transform: translate(-100px,-10px) scale(0.5);    opacity: 1;   }   0.65% { opacity: 0;    }   100% {}  }  @keyframes fall-nickzzal {   0% { }   0.5% {    transform: translate(120px,150px) rotate(200deg) rotateX(60deg) rotateY(60deg) scale(0.2);    opacity: 1;   }   0.55% {    opacity: 0;   }   100% {    opacity: 0;   }  }    html, body { overflow: hidden; }  .sigong div {   width: 100%;  }  .sigong {   animation: scale-up 1000s linear infinite;   width: 100%;   z-index: 1000;   display: table-cell;  }  .hos {   position: absolute;   width: 100%;   left: 0;   opacity: 0;   z-index: -1;   animation: 1000s appear-hos linear 23s;  }  .mobilebox {   position: absolute;   display: table;   top: 0;   left: 0;   width: 100%;   height: 375px;   vertical-align: middle;  }  .list_cmt > li:nth-child(1) {   position: relative;   animation: 1000s mobile_comment1 linear 6s;   z-index: 2000;  }  .list_cmt > li:nth-child(2) {   position: relative;   animation: 1000s mobile_comment2 linear 6.4s;   z-index: 2000;  }  .list_cmt > li:nth-child(3) {   position: relative;   animation: 1000s mobile_comment3 linear 6.8s;   z-index: 2000;  }  .list_cmt > li:nth-child(4) {   position: relative;   animation: 1000s mobile_comment4 linear 7.2s;   z-index: 2000;  }  .list_cmt > li:nth-child(5) {\
        		position: relative;	animation: 1000s mobile_comment5 linear 7.6s;z-index: 2000;}\
        	.view_subject {animation: 1000s mobile_subject linear 10s;z-index: 2000;}\
        	.cafe_navi	{animation: 1000s mobile_navi linear 7s;z-index: 2000;}\
        	.tab_cafe {	animation: 1000s mobile_tabcafe linear 9s;z-index: 2000;position: relative;}\
        	.detail_btns {animation: 1000s mobile_optionbtn1 linear 6s;z-index: 2000;position: relative;}\
        	.article_more {animation: 1000s mobile_optionbtn2 linear 6.5s;z-index: 2000;position: relative;}\
        }\
    </style>\
');
    setTimeout(
        function() {
        J$('.wrap').remove();
        J$('.chat').remove();
        },
        20000);
    
    setTimeout(
        function() {
        J$('body').append('\
        <div id="hos_movie" style="display:none;z-index:0;">\
		<!--<video class="iframeclass" poster="http://media.blizzard.com/heroes/media/promo/summer-event/summer_web_Loop_v3-first-frame.jpg" autoplay loop muted>\
			<source src="http://media.blizzard.com/heroes/media/promo/summer-event/summer_web_Loop_v3.webm"\
					type="video/webm">\
			<source src="http://media.blizzard.com/heroes/media/promo/summer-event/summer_web_Loop_v3.mp4"\
					type="video/mp4">\
		</video>-->\
        <iframe class="iframeclass" src="https://www.youtube.com/embed/D5g8bGm-y6Q?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>\
        </div>\
        ');
        J$('.hos').fadeOut(1000);
        J$('.sigong').fadeOut(1000);
            
        setTimeout(
            function() {
              J$('#hos_movie').fadeIn(3000);
            },
            1000);
        },
        30000);
    
}
