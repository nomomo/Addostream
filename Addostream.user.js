// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1.44.1
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.listValues
// @grant       GM_listValues
// @grant       GM.info
// @grant       GM_info
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       unsafeWindow
// @run-at      document-start
// @updateURL   https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// @downloadURL https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js
// ==/UserScript==
/*jshint multistr: true */

//"use strict";

(async () => {

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
    ['zzamtiger0310','짬타수아'],
    ['rldnddl789','아빠킹'],
    ['eulcs1','EU LCS'],
    ['kkoma','Kkoma'],
    ['1983kej','단군'],
    ['lol_peanut','Peanut'],
    ['faker','Faker'],
    ['nrmtzv','으음'],
    ['nicegametv','나겜'],
    ['teaminven','인벤'],
    ['capta1n_pony','포니'],
    ['huni','Huni'],
    ['sktt1_wolf','Wolf'],
    ['bang','Bang'],
    ['wpghd321','류제홍'],
    ['jmjdoc','칸데르니아'],
    ['yungi131','윤기'],
    ['mediamuse','미디어뮤즈'],
    ['veritaskk','Veritas'],
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
    ['lol_crown','Crown'],
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
    ['lol_cuvee','Cuvee'],
    ['VSL','VSL'],
    ['drlee_kor','이민우33세'],
    ['CoreJJ','CoreJJ'],
    ['lol_ambition','Ambition'],
    ['Axenix','아제닉스'],
    ['maknoonlol','막눈'],
    ['zilioner','침착맨'],
    ['timeofcreate','홍랑'],
    ['twitchshow','트위치쇼'],
    ['kangqui','강퀴'],
    ['team_spiritzero','team_spiritzero'],
    ['zizionmy','젼마이'],
    ['lol_blank','Blank'],
    ['ogn_ow','OGN 오버워치'],
    ['juankorea','주안코리아'],
    ['woowakgood','우왁굳'],
    ['www0606','푸딩'],
    ['runner0608','러너'],
    ['flowervin','꽃빈'],
    ['h920103','이초홍'],
    ['hj0514','백설양'],
    ['pbstream77','피비스트림'],
    ['llilka','릴카'],
    ['beyou0728','피유'],
    ['serayang','세라양'],
    ['mister903','갱생레바'],
    ['what9honggildong','왓구홍길동'],
    ['chicken_angel','통닭천사'],
    ['godbokihs','갓보기'],
    ['yuriseo','서유리'],
    ['kimminyoung','아옳이'],
    ['gabrielcro','가브리엘'],
    ['starcraft_kr','스타크래프트 KR'],
    ['yeziss','신예지'],
    ['ch1ckenkun','치킨쿤'],
    ['lds7131','더헬'],
    ['nodolly','노돌리'],
    ['haku861024','정직원'],
    ['nanajam777','우정잉'],
    ['leehunnyeo','별루다'],
    ['streamer2u','이유님'],
    ['hatsalsal','햇살살'],
    ['pommel0303','폼멜'],
    ['hosu0904','호수'],
    ['surrenderhs','서렌더'],
    ['s_wngud','뜨뜨뜨뜨'],
    ['eukkzzang','윾짱'],
    ['gageu','가그'],
    ['ange_i','요뿌니'],
    ['menpa1030','멘파'],
    ['dua3362','서넹'],
    ['dda_ju','다주'],
    ['taesangyun','태상'],
    ['oreo4679','리치1'],
    ['dmdtkadl69','응삼이'],
    ['sigwon','시권'],
    ['rngudwnswkd','푸린_'],
    ['jungjil','정질'],
    ['ses836','인간젤리'],
    ['DrAquinas','DrAquinas'],
    ['tree2512','말퓨'],
    ['frog135','게구리'],
    ['leechunhyang','이춘향'],
    ['cherrypach','꽃핀'],
    ['lovelyyeon','연두부'],
    ['yd0821','양띵'],
    ['2chamcham2','탬탬버린'],
    ['jinu6734','김진우'],
    ['ddolking555','똘킹'],
    ['erenjjing','에렌디라'],
    ['suk_tv','석티비'],
    ['h0720','군림보'],
    ['rellacast','렐라'],
    ['silphtv','실프'],
    ['playhearthstonekr','playhearthstonekr'],
    ['mirage720','미라지오빠'],
    ['1am_shin','신기해'],
    ['maruemon1019','마루에몽'],
    ['ulsanbigwhale','울산큰고래'],
    ['areuming','알밍'],
    ['esther950','에쓰더'],
    ['pacific8815','쌍베'],
    ['dogswellfish','개복어'],
    ['DawNHS','던'],
    ['ssambahong','홍진영'],
    ['Twipkr','트윕KR']
    ];// ['',''],

var streamerArray_name = [];
var streamerArray_display_name = [];
var streamerArray_AutoComplete = [];
for(var i=0; i<streamerArray.length; i++){
    streamerArray_name[i] = streamerArray[i][0];
    streamerArray_display_name[i] = streamerArray[i][1];
    streamerArray_AutoComplete[i] = streamerArray[i][1]+' ('+streamerArray[i][0]+')';
}

var href = 'initialize';            //
var checkedID = [];
var multitwitchID = 'hanryang1125'; // 멀티트위치 ID 저장용
var streamerID = '';                //
var ADD_API_SET_INTERVAL;           //

var twitch_api_cookie = [];         // Twitch api 쿠키

// 설정 클릭 시 enable 요소가 있는 설정을 아래 배열에 등록
var ADD_config_enable_init = ['ADD_config_top_fix'
                              ,'ADD_config_alarm'
                              ,'ADD_config_thumbnail_mouse'
                              ,'ADD_config_streamer_hide'
                              ,'ADD_config_chat_ctr'
                              ,'ADD_config_imgur_preview'
                              ,'ADD_config_imgur_preview_safe'
                              ,'ADD_config_remember_platform'
                              ,'ADD_config_chat_block'
                              ];
var ADD_status = [];
var ADD_status_init = {'ad_remove' : 0
                 ,'auto_image' : 0
                 ,'api_call' : 0
                 ,'update' : 0
                 };

var first_main_call = false;       // 첫번째 main 호출인지 체크함
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
//                                 PRE-DEFINED
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/*! jquery browser | http://jquery.thewikies.com/browser/  MIT */
(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);
var web_browser = $.browser.name;

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
!function(o){o.fn.easyNotify=function(i){var n=o.extend({title:"Notification",options:{body:"",icon:"",lang:"ko-KR",onClose:"",onClick:"",onError:""}},i);return this.init=function(){var o=this;if("Notification"in window)if("granted"===Notification.permission){var i=new Notification(n.title,n.options);i.onclose=function(){"function"==typeof n.options.onClose&&n.options.onClose()},i.onclick=function(){"function"==typeof n.options.onClick&&n.options.onClick()},i.onerror=function(){"function"==typeof n.options.onError&&n.options.onError()}}else"denied"!==Notification.permission&&Notification.requestPermission(function(i){"granted"===i&&o.init()});else alert("This browser does not support desktop notification")},this.init(),this}}($);

/*
* jQuery UI Tag-it!
* @version v2.0 (06/2011)
*
* Copyright 2011, Levy Carneiro Jr.
* Released under the MIT license.
* http://aehlke.github.com/tag-it/LICENSE
*
* Homepage: http://aehlke.github.com/tag-it/
* Authors: Levy Carneiro Jr. Martin Rehfeld Tobias Schmidt Skylar Challand Alex Ehlke
* Maintainer: Alex Ehlke - Twitter: @aehlke
* Dependencies: jQuery v1.4+ jQuery UI v1.8+
*/
(function($) {

    $.widget('ui.tagit', {
        options: {
            allowDuplicates   : false,
            caseSensitive     : true,
            fieldName         : 'tags',
            placeholderText   : null,   // Sets `placeholder` attr on input field.
            readOnly          : false,  // Disables editing.
            removeConfirmation: false,  // Require confirmation to remove tags.
            tagLimit          : null,   // Max number of tags allowed (null for unlimited).

            // Used for autocomplete, unless you override `autocomplete.source`.
            availableTags     : [],

            // Use to override or add any options to the autocomplete widget.
            //
            // By default, autocomplete.source will map to availableTags,
            // unless overridden.
            autocomplete: {},

            // Shows autocomplete before the user even types anything.
            showAutocompleteOnFocus: false,

            // When enabled, quotes are unneccesary for inputting multi-word tags.
            allowSpaces: false,

            // The below options are for using a single field instead of several
            // for our form values.
            //
            // When enabled, will use a single hidden field for the form,
            // rather than one per tag. It will delimit tags in the field
            // with singleFieldDelimiter.
            //
            // The easiest way to use singleField is to just instantiate tag-it
            // on an INPUT element, in which case singleField is automatically
            // set to true, and singleFieldNode is set to that element. This
            // way, you don't need to fiddle with these options.
            singleField: false,

            // This is just used when preloading data from the field, and for
            // populating the field with delimited tags as the user adds them.
            singleFieldDelimiter: ',',

            // Set this to an input DOM node to use an existing form field.
            // Any text in it will be erased on init. But it will be
            // populated with the text of tags as they are created,
            // delimited by singleFieldDelimiter.
            //
            // If this is not set, we create an input node for it,
            // with the name given in settings.fieldName.
            singleFieldNode: null,

            // Whether to animate tag removals or not.
            animate: true,

            // Optionally set a tabindex attribute on the input that gets
            // created for tag-it.
            tabIndex: null,

            // Event callbacks.
            beforeTagAdded      : null,
            afterTagAdded       : null,

            beforeTagRemoved    : null,
            afterTagRemoved     : null,

            onTagClicked        : null,
            onTagLimitExceeded  : null,


            // DEPRECATED:
            //
            // /!\ These event callbacks are deprecated and WILL BE REMOVED at some
            // point in the future. They're here for backwards-compatibility.
            // Use the above before/after event callbacks instead.
            onTagAdded  : null,
            onTagRemoved: null,
            // `autocomplete.source` is the replacement for tagSource.
            tagSource: null
            // Do not use the above deprecated options.
        },

        _create: function() {
            // for handling static scoping inside callbacks
            var that = this;

            // There are 2 kinds of DOM nodes this widget can be instantiated on:
            //     1. UL, OL, or some element containing either of these.
            //     2. INPUT, in which case 'singleField' is overridden to true,
            //        a UL is created and the INPUT is hidden.
            if (this.element.is('input')) {
                this.tagList = $('<ul></ul>').insertAfter(this.element);
                this.options.singleField = true;
                this.options.singleFieldNode = this.element;
                this.element.addClass('tagit-hidden-field');
            } else {
                this.tagList = this.element.find('ul, ol').andSelf().last();
            }

            this.tagInput = $('<input type="text" />').addClass('ui-widget-content');

            if (this.options.readOnly) this.tagInput.attr('disabled', 'disabled');

            if (this.options.tabIndex) {
                this.tagInput.attr('tabindex', this.options.tabIndex);
            }

            if (this.options.placeholderText) {
                this.tagInput.attr('placeholder', this.options.placeholderText);
            }

            if (!this.options.autocomplete.source) {/*
                this.options.autocomplete.source = function(search, showChoices) {
                    var filter = search.term.toLowerCase();
                    var choices = $.grep(this.options.availableTags, function(element) {
                        // Only match autocomplete options that begin with the search term.
                        // (Case insensitive.)
                        return (element.toLowerCase().indexOf(filter) === 0);
                    });
                    if (!this.options.allowDuplicates) {
                        choices = this._subtractArray(choices, this.assignedTags());
                    }
                    showChoices(choices);
                };*/
                this.options.autocomplete.source = this.options.availableTags;
            }

            if (this.options.showAutocompleteOnFocus) {
                //this.tagInput.focus(function(event, ui) {
                //    that._showAutocomplete();
                //});

                //if (typeof this.options.autocomplete.minLength === 'undefined') {
                //    this.options.autocomplete.minLength = 0;
                //}
            }
            var focused_value = '';
            this.options.autocomplete.focus = function( event, ui ) {
                //console.log(event);
                focused_value = ui.item.value;
                event.preventDefault();
                //return false;
            };

            // Bind autocomplete.source callback functions to this context.
            if ($.isFunction(this.options.autocomplete.source)) {
                this.options.autocomplete.source = $.proxy(this.options.autocomplete.source, this);
            }

            // DEPRECATED.
            if ($.isFunction(this.options.tagSource)) {
                this.options.tagSource = $.proxy(this.options.tagSource, this);
            }

            this.tagList
                .addClass('tagit')
                .addClass('ui-widget ui-widget-content ui-corner-all')
                // Create the input field.
                .append($('<li class="tagit-new"></li>').append(this.tagInput))
                .click(function(e) {
                    var target = $(e.target);
                    if (target.hasClass('tagit-label')) {
                        var tag = target.closest('.tagit-choice');
                        if (!tag.hasClass('removed')) {
                            that._trigger('onTagClicked', e, {tag: tag, tagLabel: that.tagLabel(tag)});
                        }
                    } else {
                        // Sets the focus() to the input field, if the user
                        // clicks anywhere inside the UL. This is needed
                        // because the input field needs to be of a small size.
                        that.tagInput.focus();
                    }
                });

            // Single field support.
            var addedExistingFromSingleFieldNode = false;
            if (this.options.singleField) {
                if (this.options.singleFieldNode) {
                    // Add existing tags from the input field.
                    var node = $(this.options.singleFieldNode);
                    var tags = node.val().split(this.options.singleFieldDelimiter);
                    node.val('');
                    $.each(tags, function(index, tag) {
                        that.createTag(tag, null, true);
                        addedExistingFromSingleFieldNode = true;
                    });
                } else {
                    // Create our single field input after our list.
                    this.options.singleFieldNode = $('<input type="hidden" style="display:none;" value="" name="' + this.options.fieldName + '" />');
                    this.tagList.after(this.options.singleFieldNode);
                }
            }

            // Add existing tags from the list, if any.
            if (!addedExistingFromSingleFieldNode) {
                this.tagList.children('li').each(function() {
                    if (!$(this).hasClass('tagit-new')) {
                        that.createTag($(this).text(), $(this).attr('class'), true);
                        $(this).remove();
                    }
                });
            }

            // Events.
            this.tagInput
                .keydown(function(event) {
                    //if (event.which == $.ui.keyCode.DOWN){
                    //    console.log('down key pressed!');
                    //    event.preventDefault();
                    //    return false;
                    //}
                    // Backspace is not detected within a keypress, so it must use keydown.
                    if (event.which == $.ui.keyCode.BACKSPACE && that.tagInput.val() === '') {
                        var tag = that._lastTag();
                        if (!that.options.removeConfirmation || tag.hasClass('remove')) {
                            // When backspace is pressed, the last tag is deleted.
                            that.removeTag(tag);
                        } else if (that.options.removeConfirmation) {
                            tag.addClass('remove ui-state-highlight');
                        }
                    } else if (that.options.removeConfirmation) {
                        that._lastTag().removeClass('remove ui-state-highlight');
                    }

                    // Comma/Space/Enter are all valid delimiters for new tags,
                    // except when there is an open quote or if setting allowSpaces = true.
                    // Tab will also create a tag, unless the tag input is empty,
                    // in which case it isn't caught.
                    if (
                        (event.which === $.ui.keyCode.COMMA && event.shiftKey === false) ||
                        event.which === $.ui.keyCode.ENTER ||
                        (
                            event.which == $.ui.keyCode.TAB &&
                            that.tagInput.val() !== ''
                        ) ||
                        (
                            event.which == $.ui.keyCode.SPACE &&
                            that.options.allowSpaces !== true &&
                            (
                                $.trim(that.tagInput.val()).replace( /^s*/, '' ).charAt(0) != '"' ||
                                (
                                    $.trim(that.tagInput.val()).charAt(0) == '"' &&
                                    $.trim(that.tagInput.val()).charAt($.trim(that.tagInput.val()).length - 1) == '"' &&
                                    $.trim(that.tagInput.val()).length - 1 !== 0
                                )
                            )
                        )
                    ) {
                        // Enter submits the form if there's no text in the input.
                        if (!(event.which === $.ui.keyCode.ENTER && that.tagInput.val() === '')) {
                            event.preventDefault();
                        }

                        // Autocomplete will create its own tag from a selection and close automatically.
                        if (!(that.options.autocomplete.autoFocus && that.tagInput.data('autocomplete-open'))) {
                            that.tagInput.autocomplete('close');
                            if( focused_value === '' || focused_value === null || focused_value === undefined){
                                that.createTag(that._cleanedInput());
                            }
                            else {
                                that.tagInput.val(''+focused_value);
                                that.createTag(''+focused_value);
                            }
                        }
                    }
                }).blur(function(e){
                    // Create a tag when the element loses focus.
                    // If autocomplete is enabled and suggestion was clicked, don't add it.
                    if (!that.tagInput.data('autocomplete-open')) {
                        that.createTag(that._cleanedInput());
                    }
                });

            // Autocomplete.
            if (this.options.availableTags || this.options.tagSource || this.options.autocomplete.source) {
                var autocompleteOptions = {
                    select: function(event, ui) {
                        that.createTag(ui.item.value);
                        // Preventing the tag input to be updated with the chosen value.
                        return false;
                    }
                };
                $.extend(autocompleteOptions, this.options.autocomplete);

                // tagSource is deprecated, but takes precedence here since autocomplete.source is set by default,
                // while tagSource is left null by default.
                autocompleteOptions.source = this.options.tagSource || autocompleteOptions.source;

                this.tagInput.autocomplete(autocompleteOptions).bind('autocompleteopen.tagit', function(event, ui) {
                //this.tagInput.autocomplete({source:streamerArray_AutoComplete}).bind('autocompleteopen.tagit', function(event, ui) {
                    that.tagInput.data('autocomplete-open', true);
                }).bind('autocompleteclose.tagit', function(event, ui) {
                    that.tagInput.data('autocomplete-open', false);
                });

                this.tagInput.autocomplete('widget').addClass('tagit-autocomplete');
            }
        },

        destroy: function() {
            $.Widget.prototype.destroy.call(this);

            this.element.unbind('.tagit');
            this.tagList.unbind('.tagit');

            this.tagInput.removeData('autocomplete-open');

            this.tagList.removeClass([
                'tagit',
                'ui-widget',
                'ui-widget-content',
                'ui-corner-all',
                'tagit-hidden-field'
            ].join(' '));

            if (this.element.is('input')) {
                this.element.removeClass('tagit-hidden-field');
                this.tagList.remove();
            } else {
                this.element.children('li').each(function() {
                    if ($(this).hasClass('tagit-new')) {
                        $(this).remove();
                    } else {
                        $(this).removeClass([
                            'tagit-choice',
                            'ui-widget-content',
                            'ui-state-default',
                            'ui-state-highlight',
                            'ui-corner-all',
                            'remove',
                            'tagit-choice-editable',
                            'tagit-choice-read-only'
                        ].join(' '));

                        $(this).text($(this).children('.tagit-label').text());
                    }
                });

                if (this.singleFieldNode) {
                    this.singleFieldNode.remove();
                }
            }

            return this;
        },

        _cleanedInput: function() {
            // Returns the contents of the tag input, cleaned and ready to be passed to createTag
            return $.trim(this.tagInput.val().replace(/^"(.*)"$/, '$1'));
        },

        _lastTag: function() {
            return this.tagList.find('.tagit-choice:last:not(.removed)');
        },

        _tags: function() {
            return this.tagList.find('.tagit-choice:not(.removed)');
        },

        assignedTags: function() {
            // Returns an array of tag string values
            var that = this;
            var tags = [];
            if (this.options.singleField) {
                tags = $(this.options.singleFieldNode).val().split(this.options.singleFieldDelimiter);
                if (tags[0] === '') {
                    tags = [];
                }
            } else {
                this._tags().each(function() {
                    tags.push(that.tagLabel(this));
                });
            }
            return tags;
        },

        _updateSingleTagsField: function(tags) {
            // Takes a list of tag string values, updates this.options.singleFieldNode.val to the tags delimited by this.options.singleFieldDelimiter
            $(this.options.singleFieldNode).val(tags.join(this.options.singleFieldDelimiter)).trigger('change');
        },

        _subtractArray: function(a1, a2) {
            var result = [];
            for (var i = 0; i < a1.length; i++) {
                if ($.inArray(a1[i], a2) == -1) {
                    result.push(a1[i]);
                }
            }
            return result;
        },

        tagLabel: function(tag) {
            // Returns the tag's string label.
            if (this.options.singleField) {
                return $(tag).find('.tagit-label:first').text();
            } else {
                return $(tag).find('input:first').val();
            }
        },

        _showAutocomplete: function() {
            this.tagInput.autocomplete('search', '');
        },

        _findTagByLabel: function(name) {
            var that = this;
            var tag = null;
            this._tags().each(function(i) {
                if (that._formatStr(name) == that._formatStr(that.tagLabel(this))) {
                    tag = $(this);
                    return false;
                }
            });
            return tag;
        },

        _isNew: function(name) {
            return !this._findTagByLabel(name);
        },

        _formatStr: function(str) {
            if (this.options.caseSensitive) {
                return str;
            }
            return $.trim(str.toLowerCase());
        },

        _effectExists: function(name) {
            return Boolean($.effects && ($.effects[name] || ($.effects.effect && $.effects.effect[name])));
        },

        createTag: function(value, additionalClass, duringInitialization) {
            var that = this;

            value = $.trim(value);

            if(this.options.preprocessTag) {
                value = this.options.preprocessTag(value);
            }

            if (value === '') {
                return false;
            }

            if (!this.options.allowDuplicates && !this._isNew(value)) {
                var existingTag = this._findTagByLabel(value);
                if (this._trigger('onTagExists', null, {
                    existingTag: existingTag,
                    duringInitialization: duringInitialization
                }) !== false) {
                    if (this._effectExists('highlight')) {
                        existingTag.effect('highlight');
                    }
                }
                return false;
            }

            if (this.options.tagLimit && this._tags().length >= this.options.tagLimit) {
                this._trigger('onTagLimitExceeded', null, {duringInitialization: duringInitialization});
                return false;
            }

            var label = $(this.options.onTagClicked ? '<a class="tagit-label"></a>' : '<span class="tagit-label"></span>').text(value);

            // Create tag.
            var tag = $('<li></li>')
                .addClass('tagit-choice ui-widget-content ui-state-default ui-corner-all')
                .addClass(additionalClass)
                .append(label);

            if (this.options.readOnly){
                tag.addClass('tagit-choice-read-only');
            } else {
                tag.addClass('tagit-choice-editable');
                // Button for removing the tag.
                var removeTagIcon = $('<span></span>')
                    .addClass('ui-icon ui-icon-close');
                var removeTag = $('<a><span class="text-icon">\xd7</span></a>') // \xd7 is an X
                    .addClass('tagit-close')
                    .append(removeTagIcon)
                    .click(function(e) {
                        // Removes a tag when the little 'x' is clicked.
                        that.removeTag(tag);
                    });
                tag.append(removeTag);
            }

            // Unless options.singleField is set, each tag has a hidden input field inline.
            if (!this.options.singleField) {
                var escapedValue = label.html();
                tag.append('<input type="hidden" value="' + escapedValue + '" name="' + this.options.fieldName + '" class="tagit-hidden-field" />');
            }

            if (this._trigger('beforeTagAdded', null, {
                tag: tag,
                tagLabel: this.tagLabel(tag),
                duringInitialization: duringInitialization
            }) === false) {
                return;
            }

            if (this.options.singleField) {
                var tags = this.assignedTags();
                tags.push(value);
                this._updateSingleTagsField(tags);
            }

            // DEPRECATED.
            this._trigger('onTagAdded', null, tag);

            this.tagInput.val('');

            // Insert tag.
            this.tagInput.parent().before(tag);

            this._trigger('afterTagAdded', null, {
                tag: tag,
                tagLabel: this.tagLabel(tag),
                duringInitialization: duringInitialization
            });

            if (this.options.showAutocompleteOnFocus && !duringInitialization) {
                setTimeout(function () { that._showAutocomplete(); }, 0);
            }
        },

        removeTag: function(tag, animate) {
            animate = typeof animate === 'undefined' ? this.options.animate : animate;

            tag = $(tag);

            // DEPRECATED.
            this._trigger('onTagRemoved', null, tag);

            if (this._trigger('beforeTagRemoved', null, {tag: tag, tagLabel: this.tagLabel(tag)}) === false) {
                return;
            }

            if (this.options.singleField) {
                var tags = this.assignedTags();
                var removedTagLabel = this.tagLabel(tag);
                tags = $.grep(tags, function(el){
                    return el != removedTagLabel;
                });
                this._updateSingleTagsField(tags);
            }

            if (animate) {
                tag.addClass('removed'); // Excludes this tag from _tags.
                var hide_args = this._effectExists('blind') ? ['blind', {direction: 'horizontal'}, 'fast'] : ['fast'];

                var thisTag = this;
                hide_args.push(function() {
                    tag.remove();
                    thisTag._trigger('afterTagRemoved', null, {tag: tag, tagLabel: thisTag.tagLabel(tag)});
                });

                tag.fadeOut('fast').hide.apply(tag, hide_args).dequeue();
            } else {
                tag.remove();
                this._trigger('afterTagRemoved', null, {tag: tag, tagLabel: this.tagLabel(tag)});
            }

        },

        removeTagByLabel: function(tagLabel, animate) {
            var toRemove = this._findTagByLabel(tagLabel);
            if (!toRemove) {
                throw "No such tag exists with the name '" + tagLabel + "'";
            }
            this.removeTag(toRemove, animate);
        },

        removeAll: function() {
            // Removes all tags.
            var that = this;
            this._tags().each(function(index, tag) {
                that.removeTag(tag, false);
            });
        }

    });
})(jQuery);



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                            UserScript Value Set
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function deepCopy(obj){
    //return Object.assign({}, obj);
    //jQuery.extend({}, obj);
    return JSON.parse(JSON.stringify(obj));
}

async function ADD_SetVal(key, value){
    await GM.setValue(key, JSON.stringify(value));
}

async function ADD_GetVal(key){
    var temp = await GM.getValue(key);
    if (temp !== undefined && temp !== null){
        return JSON.parse(temp);
    }
    else{
        return undefined;
    }
}

let ADD_config = {};
const ADD_config_init = {
    top_fix : { enable:null, type: 'checkbox', value: false },
    top_off_fix : { enable:null, type: 'checkbox', value: false },
    top_fix_ID : { enable:null, type: 'tag', value: ['hanryang1125'] },
    alarm : { enable:null, type: 'checkbox', value: false },
    alarm_gap : { enable:null, type: 'text', value: 5 },
    top_alarm_ID : { enable:null, type: 'tag', value: ['hanryang1125'] },
    thumbnail_mouse : { enable:null, type: 'checkbox', value: false },
    thumbnail_size : { enable:null, type: 'radio', value: 1 },
    streamer_hide : { enable:null, type: 'checkbox', value: false },
    streamer_hide_ID : { enable:null, type: 'tag', value: ['nalcs1', 'nalcs2'] },
    remember_platform : { enable:null, type: 'checkbox', value: false },
    remember_twitch : { enable:null, type: 'checkbox', value: false },
    remember_kakao : { enable:null, type: 'checkbox', value: false },
    remember_youtube : { enable:null, type: 'checkbox', value: false },
    last_version : { enable:null, type: 'set', value: version },
    dev_on : { enable:null, type: 'checkbox', value: false },
    chat_ctr : { enable:null, type: 'checkbox', value: false },
    chat_adb : { enable:null, type: 'checkbox', value: false },
    imgur_preview : { enable:null, type: 'checkbox', value: false },
    imgur_preview_safe : { enable:null, type: 'checkbox', value: true },
    imgur_preview_opacity : { enable:null, type: 'text', value: 0.93 },
    sys_meg : { enable:null, type: 'checkbox', value: false },
    alarm_noti : { enable:null, type: 'checkbox', value: false },
    url_self : { enable:null, type: 'checkbox', value: false },
    chat_scroll : { enable:null, type: 'checkbox', value: true },
    hide_nick_change : { enable:null, type: 'checkbox', value: false },
    chat_block : { enable:null, type: 'checkbox', value: false },
    chat_block_noti : { enable:null, type: 'checkbox', value: false },
    chat_block_nickname : { enable:null, type: 'checkbox', value: false },
    chat_block_contents : { enable:null, type: 'checkbox', value: false },
    chat_block_tag : { enable:null, type: 'tag', value: ['네다통','통구이','민주화','ㅁㅈㅎ','느금마','니애미','니어미','니엄마','니애비','느그애비','느그애미','애미터','애미뒤','앰뒤','앰창'] },
    theme : { enable:null, type: 'text', value: 'default' }
};

async function ADD_config_var_write(){
    if(ADD_config === undefined  || ADD_config === null){
        ADD_config = deepCopy(ADD_config_init);
    }
    await ADD_SetVal("ADD_config",ADD_config);
}

async function ADD_config_var_read(){
    var ADD_config_temp = await ADD_GetVal("ADD_config");
    if(ADD_config_temp === undefined || ADD_config_temp === null || ADD_config_temp === {}){
        ADD_config = deepCopy(ADD_config_init);
        await ADD_config_var_write();
        return;
    }

    ADD_config = deepCopy(ADD_config_init);
    for(var key in ADD_config){
        if(ADD_config_temp[key] !== undefined && ADD_config_temp[key] !== null){
            ADD_config[key] = ADD_config_temp[key];
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                     Version check & DEBUG mode enable
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

var ADD_DEBUG_MODE = false;
ADD_DEBUG_MODE = await ADD_GetVal('ADD_DEBUG_MODE');
if(ADD_DEBUG_MODE === undefined){
    ADD_DEBUG_MODE = false;
    await ADD_SetVal('ADD_DEBUG_MODE', ADD_DEBUG_MODE);
}
ADD_DEBUG('DEBUG MODE ON');

function ADD_DEBUG(msg1, msg2, msg3){
    if(ADD_DEBUG_MODE){
        var arg_no = arguments.length;
        if(arg_no === 1){
            console.log('(+Dostream) ', msg1);
        }
        else if(arg_no === 2){
            console.log('(+Dostream) ', msg1, msg2);
        }
        else if(arg_no === 3){
            console.log('(+Dostream) ', msg1, msg2, msg3);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 버전 문자열을 체크하기 쉬운 숫자로 변환
function ADD_version_string(str){
    var tempString = str.toString();
    var tempStringArray = tempString.split('.');
    for (var i = 0; i<tempStringArray.length; i++){
        if(tempStringArray[i].length < 2){
            tempStringArray[i] = '0'+tempStringArray[i];
        }
    }
    return tempStringArray.join('');
}
const version_str = GM.info.script.version;
var version = Number(ADD_version_string(version_str));
const root = "https://raw.githubusercontent.com/nomomo/Addostream/master/";

//////////////////////////////////////////////////////////////////////////////////
// 쿠키에 저장된 마지막 버전 체크하여 버전별 호환성 체크
async function ADD_migration(){
    // 설정 쿠키값이 존재하는 경우 기존에 존재하는 설정을 포팅한다.
    if (!!$.cookie("ADD_config_ary")){
        var ADD_config_ary_temp = JSON.parse($.cookie("ADD_config_ary"));
        ADD_config = deepCopy(ADD_config_init);
        if(ADD_config_ary_temp.ADD_config_top_fix !== undefined) ADD_config.top_fix.value = ADD_config_ary_temp.ADD_config_top_fix;
        if(ADD_config_ary_temp.ADD_config_top_off_fix !== undefined) ADD_config.top_off_fix.value = ADD_config_ary_temp.ADD_config_top_off_fix;
        if(ADD_config_ary_temp.ADD_config_top_fix_ID !== undefined) ADD_config.top_fix_ID.value = (ADD_config_ary_temp.ADD_config_top_fix_ID).replace(/\s/g,'').toLowerCase().split(',');
        if(ADD_config_ary_temp.ADD_config_alarm !== undefined) ADD_config.alarm.value = ADD_config_ary_temp.ADD_config_alarm;
        if(ADD_config_ary_temp.ADD_config_alarm_gap !== undefined) ADD_config.alarm_gap.value = ADD_config_ary_temp.ADD_config_alarm_gap;
        if(ADD_config_ary_temp.ADD_config_top_alarm_ID !== undefined) ADD_config.top_alarm_ID.value = (ADD_config_ary_temp.ADD_config_top_alarm_ID).replace(/\s/g,'').toLowerCase().split(',');
        if(ADD_config_ary_temp.ADD_config_thumbnail_mouse !== undefined) ADD_config.thumbnail_mouse.value = ADD_config_ary_temp.ADD_config_thumbnail_mouse;
        if(ADD_config_ary_temp.ADD_config_thumbnail_size !== undefined) ADD_config.thumbnail_size.value = ADD_config_ary_temp.ADD_config_thumbnail_size;
        if(ADD_config_ary_temp.ADD_config_streamer_hide !== undefined) ADD_config.streamer_hide.value = ADD_config_ary_temp.ADD_config_streamer_hide;
        if(ADD_config_ary_temp.ADD_config_streamer_hide_ID !== undefined) ADD_config.streamer_hide_ID.value = (ADD_config_ary_temp.ADD_config_streamer_hide_ID).replace(/\s/g,'').toLowerCase().split(',');
        if(ADD_config_ary_temp.ADD_config_remember_kakao !== undefined) ADD_config.remember_kakao.value = ADD_config_ary_temp.ADD_config_remember_kakao;
        if(ADD_config_ary_temp.ADD_config_remember_youtube !== undefined) ADD_config.remember_youtube.value = ADD_config_ary_temp.ADD_config_remember_youtube;
        if(ADD_config_ary_temp.ADD_config_last_version !== undefined) ADD_config.last_version.value = ADD_config_ary_temp.ADD_config_last_version;
        if(ADD_config_ary_temp.ADD_config_dev_on !== undefined) ADD_config.dev_on.value = ADD_config_ary_temp.ADD_config_dev_on;
        if(ADD_config_ary_temp.ADD_config_chat_ctr !== undefined) ADD_config.chat_ctr.value = ADD_config_ary_temp.ADD_config_chat_ctr;
        if(ADD_config_ary_temp.ADD_config_chat_adb !== undefined) ADD_config.chat_adb.value = ADD_config_ary_temp.ADD_config_chat_adb;
        if(ADD_config_ary_temp.ADD_config_imgur_preview !== undefined) ADD_config.imgur_preview.value = ADD_config_ary_temp.ADD_config_imgur_preview;
        if(ADD_config_ary_temp.ADD_config_imgur_preview_safe !== undefined) ADD_config.imgur_preview_safe.value = ADD_config_ary_temp.ADD_config_imgur_preview_safe;
        if(ADD_config_ary_temp.ADD_config_imgur_preview_opacity !== undefined) ADD_config.imgur_preview_opacity.value = ADD_config_ary_temp.ADD_config_imgur_preview_opacity;
        if(ADD_config_ary_temp.ADD_config_sys_meg !== undefined) ADD_config.sys_meg.value = ADD_config_ary_temp.ADD_config_sys_meg;
        if(ADD_config_ary_temp.ADD_config_alarm_noti !== undefined) ADD_config.alarm_noti.value = ADD_config_ary_temp.ADD_config_alarm_noti;
        if(ADD_config_ary_temp.ADD_config_url_self !== undefined) ADD_config.url_self.value = ADD_config_ary_temp.ADD_config_url_self;
        if(ADD_config_ary_temp.ADD_config_chat_scroll !== undefined) ADD_config.chat_scroll.value = ADD_config_ary_temp.ADD_config_chat_scroll;
        $.removeCookie("ADD_config_ary");
        await ADD_config_var_write();
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 하루 한 번 버전 체크
async function checkNewVersion() {
    ADD_DEBUG('Version - 버전 체크 중...');
    var ver_fut;
    var ver_fut_text = '';
    var return_val = '';
    var new_version_available = false;
    let result;

    var time_check_version = await ADD_GetVal('time_check_version');
    if(time_check_version === undefined){
        ADD_DEBUG('Version - 이전에 버전 체크한 시간이 없어 새로 쓴다');
        time_check_version = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
        await ADD_SetVal('time_check_version',time_check_version);
    }
    var time_pre = new Date(time_check_version);
    var time_cur = new Date();
    var time_bet = Number((time_cur - time_pre)/24/60/60/1000).toFixed(4);
    ADD_DEBUG('Version - 현재 버전 체크 시간 :',getTimeStampWithText(time_cur,'s'));

    // 현재 및 이전 버전을 확인함
    if(ADD_config.last_version === undefined || ADD_config.last_version === null){
        await ADD_config_var_read();
    }

    var ver_pre = Number(ADD_config.last_version.value);
    var ver_cur = version;

    if(time_bet > 1){
        ADD_DEBUG('Version - 버전 체크 시도');
        try {
            response = await $.ajax({
                url: root + "package.json",
                type: 'GET',
                dataType:'json'
            });
            ADD_DEBUG('Version - 버전확인 성공', return_val);

            // 버전 체크 시간을 다시 씀
            await ADD_SetVal('time_check_version',new Date());

            ver_fut_text = response.version;
            ver_fut = Number(ADD_version_string(ver_fut_text));
            ADD_DEBUG('Version - 현재 버전: '+ver_cur+', 이전 버전: '+ver_pre+' , 최신 버전: '+ver_fut);

            // 현재 버전 > 이전 버전
            if( ver_cur > ver_pre ){
                if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
                    ADD_send_sys_msg('애드온이 최근 업데이트 됨('+version_str+').',500);
                }
                ADD_config.last_version.value = version;
                await ADD_config_var_write();
            }

            // 업데이트 가능한 버전 > 현재 버전
            if( ver_fut > ver_cur ){
                if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
                    ADD_send_sys_msg('(+) 새로운 버전(<a href="https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js" target="_blank">v'+ver_fut_text+'</a>) 으로 업데이트 가능',500);
                }
                await ADD_SetVal('available_version',{version:ver_fut, version_str:ver_fut_text});
                new_version_available = true;
            }
            response = null;

        } catch (error) {
            ADD_DEBUG('Version - 버전확인 실패');
            console.error(error);
        }
    }
    else{
        ADD_DEBUG('Version - 이전 버전 체크 시간 :',getTimeStampWithText(time_pre,'s'));
        ADD_DEBUG('Version - 현재 와의 시간 차이 : ' + time_bet + ' 시간 < 1 이므로 체크하지 않음');

        var available_version = await ADD_GetVal('available_version');
        if(available_version === undefined || available_version === null){
            ADD_DEBUG('Version - 이용가능한 버전 확인 실패');
            return false;
        }
        ver_fut_text = available_version.version_str;
        ver_fut = available_version.version;
        if(ver_fut > ver_cur){
            new_version_available = true;
        }
    }

    if(new_version_available){
        if($('#new_version_available_text').length !== 0){
            $('#new_version_available_text').show().html('- <a href="https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js" target="_blank">New Version(v'+ver_fut_text+') Available!</a>');
            $('#github_url_text').hide();
        }
        else{
            setTimeout(
            function() {
                if($('#new_version_available_text').length !== 0){
                    $('#new_version_available_text').show().html('- <a href="https://raw.githubusercontent.com/nomomo/Addostream/master/Addostream.user.js" target="_blank">New Version(v'+ver_fut_text+') Available!</a>');
                    $('#github_url_text').hide();
                }
                else{
                    ADD_DEBUG('Version - #new_version_available_text 가 존재하지 않음');
                }
            },1000);
        }
    }

    return true;
}

checkNewVersion();
await ADD_migration();
await ADD_config_var_read();


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                      CSS
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function Addostream_CSS(){
    GM_addStyle(`
        /* microtip.css
        * @author Ghosh
        * https://github.com/ghosh/microtip
        * MIT licensed
        */
        [aria-label][role~="tooltip"]{position:relative}[aria-label][role~="tooltip"]:before,[aria-label][role~="tooltip"]:after{transform:translate3d(0,0,0);-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;opacity:0;pointer-events:none;transition:all var(--microtip-transition-duration,.18s) var(--microtip-transition-easing,ease-in-out) var(--microtip-transition-delay,0s);position:absolute;box-sizing:border-box;z-index:10;transform-origin:top}[aria-label][role~="tooltip"]:before{background-size:100% auto!important;content:""}[aria-label][role~="tooltip"]:after{background:rgba(17,17,17,.9);border-radius:4px;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size,11px);font-weight:var(--microtip-font-weight,normal);text-transform:var(--microtip-text-transform,none);padding:.5em 1em;white-space:nowrap;box-sizing:content-box}[aria-label][role~="tooltip"]:hover:before,[aria-label][role~="tooltip"]:hover:after,[aria-label][role~="tooltip"]:focus:before,[aria-label][role~="tooltip"]:focus:after{opacity:1;pointer-events:auto}[role~="tooltip"][data-microtip-position|="top"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-bottom:5px}[role~="tooltip"][data-microtip-position|="top"]:after{margin-bottom:11px}[role~="tooltip"][data-microtip-position|="top"]:before{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position|="top"]:hover:before{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position|="top"]:after{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~="tooltip"][data-microtip-position="top"]:hover:after{transform:translate3d(-50%,-5px,0)}[role~="tooltip"][data-microtip-position="top-left"]:after{transform:translate3d(calc(-100% + 16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-left"]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}[role~="tooltip"][data-microtip-position="top-right"]:after{transform:translate3d(calc(0% + -16px),0,0);bottom:100%}[role~="tooltip"][data-microtip-position="top-right"]:hover:after{transform:translate3d(calc(0% + -16px),-5px,0)}[role~="tooltip"][data-microtip-position|="bottom"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-top:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position|="bottom"]:after{margin-top:11px}[role~="tooltip"][data-microtip-position|="bottom"]:before{transform:translate3d(-50%,-10px,0);bottom:auto;left:50%;top:100%}[role~="tooltip"][data-microtip-position|="bottom"]:hover:before{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position|="bottom"]:after{transform:translate3d(-50%,-10px,0);top:100%;left:50%}[role~="tooltip"][data-microtip-position="bottom"]:hover:after{transform:translate3d(-50%,0,0)}[role~="tooltip"][data-microtip-position="bottom-left"]:after{transform:translate3d(calc(-100% + 16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-left"]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}[role~="tooltip"][data-microtip-position="bottom-right"]:after{transform:translate3d(calc(0% + -16px),-10px,0);top:100%}[role~="tooltip"][data-microtip-position="bottom-right"]:hover:after{transform:translate3d(calc(0% + -16px),0,0)}[role~="tooltip"][data-microtip-position="left"]:before,[role~="tooltip"][data-microtip-position="left"]:after{bottom:auto;left:auto;right:100%;top:50%;transform:translate3d(10px,-50%,0)}[role~="tooltip"][data-microtip-position="left"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-right:5px;margin-bottom:0}[role~="tooltip"][data-microtip-position="left"]:after{margin-right:11px}[role~="tooltip"][data-microtip-position="left"]:hover:before,[role~="tooltip"][data-microtip-position="left"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before,[role~="tooltip"][data-microtip-position="right"]:after{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}[role~="tooltip"][data-microtip-position="right"]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-bottom:0;margin-left:5px}[role~="tooltip"][data-microtip-position="right"]:after{margin-left:11px}[role~="tooltip"][data-microtip-position="right"]:hover:before,[role~="tooltip"][data-microtip-position="right"]:hover:after{transform:translate3d(0,-50%,0)}[role~="tooltip"][data-microtip-size="small"]:after{white-space:pre-line;width:80px}[role~="tooltip"][data-microtip-size="medium"]:after{white-space:pre-line;width:150px}[role~="tooltip"][data-microtip-size="large"]:after{white-space:pre-line;width:260px}[role~="tooltip"][data-microtip-size="custom"]:after{white-space:pre-line;width:220px;text-align:center}[data-microtip-size="custom2"]:after{white-space:pre-line;text-align:center}\

        /* Customize CSS for tagit*/
        ul.tagit {
            cursor:pointer;
            margin: 0px;
            -webkit-padding-start: 5px !important;
            min-height:30px;
        }
        ul.tagit li span {
            text-overflow:ellipsis;
        }
        ul.tagit li.tagit-choice {
            cursor:default;
        }
        ul.tagit li.tagit-new {
            padding: .25em 4px .25em 3px !important;
            min-width:80px;
            width:80px;
            max-width:120px;
            float:left;
        }

        /* https://raw.githubusercontent.com/aehlke/tag-it/master/css/jquery.tagit.css */
        ul.tagit {
            padding: 1px 5px;
            overflow: auto;
            margin-left: inherit; /* usually we don't want the regular ul margins. */
            margin-right: inherit;
        }
        ul.tagit li {
            display: block;
            float: left;
            margin: 2px 5px 2px 0;
        }
        ul.tagit li.tagit-choice {
            position: relative;
            line-height: inherit;
        }
        input.tagit-hidden-field {
            display: none;
        }
        ul.tagit li.tagit-choice-read-only {
            padding: .2em .5em .2em .5em;
        }

        ul.tagit li.tagit-choice-editable {
            padding: .2em 18px .2em .5em;
        }

        ul.tagit li.tagit-new {
            padding: .25em 4px .25em 0;
        }

        ul.tagit li.tagit-choice a.tagit-label {
            cursor: pointer;
            text-decoration: none;
        }
        ul.tagit li.tagit-choice .tagit-close {
            cursor: pointer;
            position: absolute;
            right: .1em;
            top: 50%;
            margin-top: -8px;
            line-height: 17px;
        }

        /* used for some custom themes that don't need image icons */
        ul.tagit li.tagit-choice .tagit-close .text-icon {
            display: none;
        }

        ul.tagit li.tagit-choice input {
            display: block;
            float: left;
            margin: 2px 5px 2px 0;
        }
        ul.tagit input[type="text"] {
            -moz-box-sizing:    border-box;
            -webkit-box-sizing: border-box;
            box-sizing:         border-box;

            -moz-box-shadow: none;
            -webkit-box-shadow: none;
            box-shadow: none;

            border: none;
            margin: 0;
            padding: 0;
            width: inherit;
            background-color: inherit;
            outline: none;
        }

        /* Optional scoped theme for tag-it which mimics the zendesk widget. */
        ul.tagit {
            border-style: solid;
            border-width: 1px;
            border-color: #C6C6C6;
            background: inherit;
        }
        ul.tagit li.tagit-choice {
            -moz-border-radius: 6px;
            border-radius: 6px;
            -webkit-border-radius: 6px;
            border: 1px solid #CAD8F3;
            background: none;
            background-color: #DEE7F8;

            font-weight: normal;
        }
        ul.tagit li.tagit-choice .tagit-label:not(a) {
            /*color: #555;*/
        }
        ul.tagit li.tagit-choice a.tagit-close {
            text-decoration: none;
        }
        ul.tagit li.tagit-choice .tagit-close {
            right: .4em;
        }
        ul.tagit li.tagit-choice .ui-icon {
            display: none;
        }
        ul.tagit li.tagit-choice .tagit-close .text-icon {
            display: inline;
            font-family: arial, sans-serif;
            font-size: 16px;
            line-height: 16px;
            color: #777;
        }
        ul.tagit li.tagit-choice:hover, ul.tagit li.tagit-choice.remove {
            background-color: #bbcef1;
            border-color: #6d95e0;
        }
        ul.tagit li.tagit-choice a.tagLabel:hover,
        ul.tagit li.tagit-choice a.tagit-close .text-icon:hover {
            color: #222;
        }
        ul.tagit input[type="text"] {
            color: #333333;
            background: none;
        }
        .ui-widget {
            font-size: 1.0em;
        }

        /* Forked from a jQuery UI theme, so that we don't require the jQuery UI CSS as a dependency. */
        .tagit-autocomplete.ui-autocomplete { position: absolute; cursor: default; }
        * html .tagit-autocomplete.ui-autocomplete { width:1px; } /* without this, the menu expands to 100% in IE6 */
        .tagit-autocomplete.ui-menu {
            list-style:none;
            padding: 2px;
            margin: 0;
            display:block;
            float: left;
        }
        .tagit-autocomplete.ui-menu .ui-menu {
            margin-top: -3px;
        }
        .tagit-autocomplete.ui-menu .ui-menu-item {
            font-size:11px;;
            margin:0;
            padding: 0;
            zoom: 1;
            float: left;
            clear: left;
            width: 100%;
        }
        .tagit-autocomplete.ui-menu .ui-menu-item a {
            text-decoration:none;
            display:block;
            padding:.2em .4em;
            line-height:1.5;
            zoom:1;
        }
        .tagit-autocomplete .ui-menu .ui-menu-item a.ui-state-hover,
        .tagit-autocomplete .ui-menu .ui-menu-item a.ui-state-active {
            font-weight: normal;
            margin: -1px;
        }
        .tagit-autocomplete.ui-widget-content { border: 1px solid #aaaaaa; background: #ffffff 50% 50% repeat-x; color: #222222;}
        .tagit-autocomplete.ui-corner-all, .tagit-autocomplete .ui-corner-all { -moz-border-radius: 4px; -webkit-border-radius: 4px; -khtml-border-radius: 4px; border-radius: 4px; }
        .tagit-autocomplete .ui-state-hover, .tagit-autocomplete .ui-state-focus { border: 1px solid #999999; background: #dadada; font-weight: normal; color: #212121; }
        .tagit-autocomplete .ui-state-active  { border: 1px solid #aaaaaa; }
        .tagit-autocomplete .ui-widget-content { border: 1px solid #aaaaaa; }
        .tagit .ui-helper-hidden-accessible { position: absolute !important; clip: rect(1px,1px,1px,1px); }


        // Dostream+ CSS
        .search a.afreeca{display:none !important;}
         ul.nav{display:none !important;}
         #streamSearchForm{display:none !important;}
        .onstream .nav-brand_mod{text-decoration:none;}//height:45px;color:#fff;}
        .nav-brand_mod{display:block;float:left;width:112px;height:63px;margin:0 20px 0 24.5px;background-position:center center;background-repeat:no-repeat;}
        .nav-brand_mod {
            display: block;
            font-family: 'Noto Serif',serif;
            font-size: 20px;
            user-select: none;
            cursor: pointer;
            text-decoration: none;
            color: #f8f9fa;
        }
        .nav-brand, .nav-brand_mod{color:#f8f9fa;overflow:visible;margin-left:24.5px;}
        .nav-brand_mod:hover, .nav-brand_mod:visited, .nav-brand_mod:active, .nav-brand_mod:focus {text-decoration:none !important;color:#f8f9fa !important;}
        .onstream .AD_title{height:45px;padding:7px 0}
        .AD_title {position:absolute; top:0; right:10px; height:63px; padding:16px 0; font-size:11px; font-style:italic; color:#999}
        .icon_star{position:absolute !important;top:10px; right:25px; z-index:10;}
        .icon_pushpin{position:absolute !important;top:10px; right:10px; z-index:50;}
        #ADD_config {cursor:pointer; padding-right:10px;}
        #ADD_test_button {cursor:pointer;}
        #popup_ADD_config, #popup_ADD_quick, #popup_ADD_test {display:none; font-size:12px; z-index:10000; position:absolute; width:502px;}
        #popup_ADD_config table td:nth-child(1) {width:160px;}
        #popup_ADD_config table td:nth-child(2) {width:310px;}
        #popup_ADD_config{ top:50px; right:10px; }
        #popup_ADD_config .input_text_by_tag { display:none; }
        #popup_ADD_config  .no_border {border:none;}
        #ADD_change_multi { display:none; }
        .onstream #ADD_change_multi { opacity:1; display:inline-block !important;}
        #ADD_quick_list { display:none; }
        .onstream #ADD_quick_list { opacity:1; display:inline-block !important;}
        #popup_ADD_quick .modal-body{ padding:10px; }
        #popup_ADD_quick { top:50px; right:10px; }
        #popup_ADD_quick .quick_list_title { padding:0 5px 2px 5px; margin-bottom:0px; border-bottom:2px solid rgb(221, 221, 221); font-weight:bold;}
        #popup_ADD_quick ul { list-style:none; margin:0;padding:0;display:block;font-size:11px;}
        #popup_ADD_quick li { border-bottom:1px solid #eee; display:block;}
        #popup_ADD_quick a { padding:5px 5px 5px 5px; display:block;color:#333;text-decoration:none;}
        #popup_ADD_quick li>a:hover { background-color:#d3d3d3;}
        #popup_ADD_quick img { float:left;display:block;width:60px;height:30px;vertical-align:middle;border:0; margin-right:10px;}
        #popup_ADD_quick .title {overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:40px;color:#222}
        #popup_ADD_quick .info {}
        #popup_ADD_quick .from {float:left;color:#666;}
        #popup_ADD_quick .viewers { text-align: right; color: #7d7d7b;}
        #popup_ADD_quick .ADD_checkbox {display:none;}
        #popup_ADD_quick .ADD_li_box {right:45px;top:-27px;height:10px;font-size:10px;}
        #popup_ADD_quick .ADD_li_box .btn {font-size:9px;padding:1px 2px;letter-spacing:-0.5px; border:0; opacity:0.7;border-radius:0px;}
        #popup_ADD_quick .icon_star{top:7px; right:15px; z-index:10;}
        #popup_ADD_quick .icon_pushpin{top:7px; right:5px; z-index:50;}
        #popup_ADD_quick .ADD_thumb_elem{left:70px;}
        #popup_ADD_quick .ADD_thumb_elem{width:290px; height:163px; !important;}
        #popup_ADD_test{ top:50px; right:10px; }
        .modal-content {box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);background-clip: padding-box;background-color: #fff;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 6px;outline: 0 none;}
        .modal-content {opacity:0.93}
        .modal-body {padding: 10px 10px 5px 10px;}
        .modal-footer {border-top: 1px solid #e5e5e5;padding: 10px 15px;text-align: right;}
        #ADD_config_Success {font-size:11px;}
        .btn {font-size: 12px;}
        .main-streams>ul>li>a{padding: 10px 5px 10px 15px !important;}
        .ADD_li_box_container{position:relative;}
        .ADD_li_box{position:absolute; top:-42px; right:70px; height:30px; vertical-align:middle; text-align:center; font-size:12px; z-index:100; margin:0;}
        .ADD_li_box:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}
        #popup_ADD_quick .ADD_checkbox_container{display:none;}
        #popup_ADD_quick .multitwitch_button btn:hover{background:none;}
        .ADD_checkbox_container{display:inline-block;line-height:100%;vertical-align:middle; }
        .ADD_checkbox{display:none;width:15px;height:15px;margin:1px 2px 1px 0 !important;border:none !important;}
        .ADD_li_box .btn-default{color:#7d7d7d}
        .ADD_checkbox_container .btn span.glyphicon {opacity: 0.2;}
        .ADD_checkbox_container .btn.active span.glyphicon {opacity: 1; color:#9B59B6}
        .multitwitch_button{vertical-align:middle;display:inline-block;} //background-color:#eee; padding:5px 8px; height:26px;
        .form_disabled {color:#888;}
        .form_enabled {color:#222;}
        #popup_ADD_config table td {height:26px; line-height: 1.5; font-size:11px; padding:2px 5px 2px 10px; vertical-align:middle; border-top-color:#e5e5e5;}
        #popup_ADD_config table td label{vertical-align:middle;}
        #popup_ADD_config table td input[type="text"]{font-size:11px;}
        #popup_ADD_config table td input[type="checkbox"]{vertical-align:middle; margin-bottom:0; margin-top:0;}
        #popup_ADD_config table td input[type="radio"]{vertical-align:middle; margin-bottom:0; margin-top:0;}
        #popup_ADD_config table td .tooltip_container{float:right;}
        .btn-success {margin-right: 10px;}
        .btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open .dropdown-toggle.btn-success {background-color: #5cb85c;border-color: #4cae4c;color: #fff;cursor: Default;margin-right: 10px;}
        .confirm_selection {animation: glow .5s infinite alternate;}
        @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
       .multitwitch_ready {animation: glow2 0.5s 4 alternate;}
        @keyframes glow2 {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #6441A4;}}
        .fixed_streamer{}//{background-color:#f5f5f5;}
        .td_strong{font-weight:bold;}
        #notice_text_elem{display:none;font-size:10px;color:#666;position:absolute;top:0px;left:150px;max-width:600px;height:63px;text-align:left; margin-right:150px; vertical-align:middle;overflow: hidden;text-overflow: ellipsis;}
        .onstream #notice_text_elem {height:45px;}
        #notice_text_elem:before{content: "";display:inline-block;vertical-align: middle;height: 100%;}
        #notice_text{display:inline-block;vertical-align:middle;line-height:150%;}
        #at {cursor:pointer;display:inline-block;margin:4px 2px 0 2px;height:24px;animation-name: at_spin;animation-duration: 18s;animation-iteration-count: infinite;animation-timing-function: linear;}
        @keyframes at_spin{0%{transform:rotate(0)}25%{transform:rotate(90deg);text-shadow:0 0 3px #F0F8FF}50%{transform:rotate(180deg);text-shadow:0 0 8px #B0E0E6}100%{transform:rotate(359deg)}}
        .ADD_under_dev {display:none;}
        .imgur_container {position:relative;}
        .imgur_safe_screen {display:inline-flex;align-items:center;position:absolute;top:0;left:0;text-align:center;vertical-align:middle;width:100%;height:100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJElEQVQImWPo6ur6D8MMDAz/GZA5XV1dEAEYB8pGcLq6uv4DAKP8I1nj691jAAAAAElFTkSuQmCC) repeat;}
        .imgur_control_button_container{position:relative;}
        .imgur_control_button{position:absolute;width:60px;height:20px;text-align:right;}
        .ADD_tr_10_10{top:10px;right:10px;}
        .ADD_br_10_10{bottom:10px;right:10px;}
        .imgur_control_button span{font-size:20px; display:inline-block;opacity:0.5;cursor:pointer;}
        .imgur_safe_button {opacity:1.0;color:rgba(0, 0, 0, 1.0);line-height:200%;margin:0 auto;text-align:center;vertical-align:middle;cursor:pointer;color:black;font-size:12px;font-family: "Malgun Gothic","맑은고딕","맑은 고딕",Dotum,"Helvetica Neue",Helvetica,Arial,sans-serif;}
        .imgur_image_in_chat {max-width:320px !important;max-height:1000px !important;padding:5px 0px;margin:0 auto;display:inline-block;}
        .lightbox-opened img{max-width: 100%;box-shadow: 0 0 6px 3px #333; opacity:1.0;}
        .lightbox-opened {z-index: 100000;background-color: rgba(51,51,51,0.8);cursor: pointer;height: 100%;left: 0;overflow-y: scroll;padding: 24px;position: fixed;text-align: center;top: 0;width: 100%;}
        .lightbox-opened:before {background-color: rgba(51,51,51,0.8);color: #eee;content: "x";font-family: sans-serif;padding: 6px 12px;position: fixed;text-transform: uppercase;}
        .no-scroll {overflow: hidden;}
        #ADD_send_location_container {position:absolute;bottom:55px;right:10px;z-index:10;vertical-align:middle;}
        #ADD_send_location_notice {display:none;width:60px;height:24px;font-size:10px;color:#333;background-color:#f5f5f5;}
        #ADD_send_location_button {width:24px;height:24px;font-size:18px;cursor:pointer;}
        div.ADD_thumb_elem_container{position:relative;display:none;}
        div.ADD_thumb_elem_container div.ADD_thumb_elem{position:absolute;top:0px;left:105px;z-index:300;}
        div.ADD_thumb_elem_container img.ADD_thumb_img{z-index:400;}
        div.ADD_thumb_elem_container div.ADD_thumb_size_0{width:240px;height:180px;}
        div.ADD_thumb_elem_container div.ADD_thumb_size_1{width:20vw;height:calc(20vw / 16 * 9);}
        div.ADD_thumb_elem_container div.ADD_thumb_size_2{width:30vw;height:calc(30vw / 16 * 9);}
        div.ADD_thumb_elem_container div.ADD_thumb_size_3{width:40vw;height:calc(40vw / 16 * 9);}
        div.ADD_thumb_elem_container div.ADD_thumb_elem::before{content: "";position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin:auto;width: 60px;height: 60px;animation: ADD_180_rotate 0.8s infinite linear;border: 8px solid #333;border-right-color: transparent;border-radius: 50%;z-index:-1;
        }
        .loader_container{position:relative;width:100%;height:100%;}
        .loader {position:absolute;top:0;bottom:0;right:-20px;margin:auto 0;border: 2px solid #f3f3f3;border-top: 2px solid #666;border-radius: 50%;width: 20px;height: 20px;animation: ADD_180_rotate 0.8s cubic-bezier(0.4, 0, 1, 1) infinite;
        }
        @keyframes ADD_180_rotate {
          0%    { transform: rotate(0deg); }
          100%  { transform: rotate(360deg); }
        }
        #view_additional_message_container {position:absolute;bottom:46px;left:0px;z-index:15;width:100%; height:30px;cursor:pointer;}
        #view_additional_message {position:relative;padding:5px 0;background-color:rgba(0,0,0,0.6);text-align:center;color:#fff;font-size:12px;}
        .ADD_chat_again, .ADD_twitch_api_again{cursor:pointer;}
        .modal-body tbody tr:hover {background-color:#E6E6E6;}
        .lightbox-opened-blocked-chat {background-color:#fff; max-width:600px; margin:0 auto; text-align:left;padding:15px;font-size:12px}
        .modal-body tbody .btn-xxs {padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;cursor:pointer;}
        .modal-body tbody .btn-xxs .glyphicon{}
        .modal-body tbody .btn-xxs span.glyphicon {opacity: 0.2;}
        .modal-body tbody .btn-xxs.active span.glyphicon {opacity: 1;}
        .modal-body tbody .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}
        #popup_ADD_config .modal-body tbody input[type="checkbox"]{display:none;}
        #new_version_available_text a{color:#E3242B}
    `);

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
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                 CSS THEME
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// 테마
var ADD_THEME = {
    Default : {},
    Dark : {
        header_ftc : '#ccc !important',
        chat_contents_bgc : '#191919 !important',
        chat_fc : '#ccc !important',
        color_lightest: '#ababab !important',
        color_lighter : '#999 !important',
        color_mid : '#777 !important',
        color_hard : '#333 !important',
        color_harder : '#222 !important',
        color_hardest : '#111 !important',
        chat_container_bdc : '#000 !important',
        color_complementary : '#fff !important',
        complementary_bgc_alpha : 'rgba(21,21,21,0.8) !important',
        tagit_color : '#999 !important',
        tagit_bgc : '#222',
        tagit_bg : '#222 50% 50% repeat-x',
        tagit_bdc :'#111',
        logo : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAANCAYAAADG4RJzAAAACXBIWXMAAAsTAAALEwEAmpwYAABIZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDI6NTI6MTgrMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQzNTQyYWUyLWU3NDAtMTFlNy04MTc3LTg1NWM2NWM0OGMwYTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpjYzBiMGI3Yy1hNjBiLWEzNDctYTcxYi1kZTFlZTUzNjJkZDU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDctMjlUMDI6MTE6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDZlNmM5ZDctYTQ5NS0yYjQ4LWFkNTQtODk4Y2YxOGYxNmNiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA3LTI5VDAyOjExOjEwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmE2MjE4M2JhLWM2ZjItY2U0MC04ZjZkLTQ1YWU5YWViNzRjMDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo0OToxMCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzZkMDcyNS1kZDc3LTNmNGUtYmIzYi0zMzlhOTZhNjE4YzU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDI6NDk6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAyOjUyOjE4KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmNmY2NhNTc1LTQ5M2ItMmQ0ZC04NTYxLTE4YTJlMTg3NDU4OTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMjo1MjoxOCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6YjE0YWEyNzItOWFjZC1lMzRlLTgxNjMtMWU4NzhiZDAwZWNjPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjQzNmQwNzI1LWRkNzctM2Y0ZS1iYjNiLTMzOWE5NmE2MThjNTwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmNjMGIwYjdjLWE2MGItYTM0Ny1hNzFiLWRlMWVlNTM2MmRkNTwvc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8L3htcE1NOkRlcml2ZWRGcm9tPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+RG9zdHJlYW0rPC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5Eb3N0cmVhbSs8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6Q0Q5MDgzNDI5NTUyMTFFMzg5N0RFOTExMjE3RDQ2Mzk8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjkxPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEzPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6a2oV1AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOySURBVHja7Fivb+Q4GH2pim6pSQtWc6QszMSktyga4vKgU8iwQfkDohSUDTIbMioKb8go6JiJ2bCi6EhJ6BVV8gLHEyexM9Vql9ydpYA4jr/n973vRxKhH3Gu9CFFcMhyjW3dRfh//NDQWk9m4lwrJTQnGD8hXAultFK5jgH9qwARLrTKY/2fIJtwESbUEv6ryOj3z2P8K8h+eXn55/Hx8XeX7Ct3wc0dC7/d1dG+ApAmmDkjzrVSyrk8DjtHh3MJrgmI5kJpdSzAAKQHBXePOLfrTcQN9xMb0/09ohjeNZfgXOfO2qmt8blsxPd4+/mQOG5vb3+7vr7+GpKW2URwTQKpwih/nGYMQHfOgnHI8Kg2zseELEWVeTYcjnAxwjnD1ZM02AtjmhLm2jrb6NcKIeakB/hSSumnp6c/Asq+wR0D0LbogIVCyHB3Myj6kEqU6y3qzr7TRXVZQiLFhhNzAJaAoUJzCu+6FFX2WZVR7E4TbHGujwWDLMsBw9sr5GjNnyiYRLne4WTP1tVRWUoAEq9vHhxVBrqtI5cLxlpk1D3rPHVYRwFAkiR/ufdXs67DtezvS3pwRPNNCsgGsvtMFkuRxMPdaUcjujtFVnmrFQD5irdwO4Tnk81o28gSEScpgAr7unO4LRznXsLZou2G6DY4Sqx3J9cDYACqzHGWR5wPDw9fKKURpTQCgKZpvrn3A9lkhdUFuozXLThjTDbyQiQAXb1Hdc7Hnm5nMap6ArzPYm24bgwJffow0WaJCe8djKbJWmI8AJ8OL4tzGFdT77VtSKb9waz6PuEcR8fRjtKI0gwVGIqjwue7mp4sbxHpMaQHU1QPQEYpKN1G51Dv18xJ8UVTLyAvgW4EXD7/+/u7/vj4+Nudu/6M90zh2CAFUO1r6/UgWSZHS5SzuD1FO0rxzIU+Fhvw562uO0RhQpbI+kkfXK6KAwTaiJ5MmtQSEOf9/f1VUNnjFDHvgYuCAVU2FKiuRQuAnavloBiWsCFHxvmsYnetH7g3qpaeBTFcHnF+RDFVsdfWUj0Ji3MhjYQ3jPO+B64yDAXNqLQxiRjjlu5oKn9pIsBEzKTFDBSs1YpcKMrz9GQwbODWAcLF0M51Eo0EWMJgHG5aNvtrYu7EqS1/zjfnCogzMExRWf4pgvW2DhbB2T+VyXrChT4W7MKeRHNhlGZHlVE0icIYWoWMuh2B/12gQrl+Rt31qYVwLfqPpnPakQx2TpZr7O+OY1tWXKN3rX0C16a3JfV8rn8fAJWt/iNyFCmZAAAAAElFTkSuQmCC") !important',
        lock_image : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAwCAYAAAALiLqjAAAACXBIWXMAAAsTAAALEwEAmpwYAABEymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTEyLTIzVDAzOjA2OjQ2KzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDM6MDc6NTkrMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTEyLTIzVDAzOjA3OjU5KzA5OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjFmZTViOGVjLWVhNWItNjM0ZC1iNjg3LTk0ZDg2MGJjMThkMzwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBiNDMzMDVjLWU3NDMtMTFlNy04MTc3LTg1NWM2NWM0OGMwYTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDpkNjI5YTBjNC1kYWUxLTQ4NDMtYmNlYy1kOTBmZDkwOTFhZWQ8L3N0UmVmOmluc3RhbmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnhtcC5kaWQ6MDQ2MmIwMTUtY2FkNy0zZDQxLWJiOWYtMWZhMzc3ODU3NTVlPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MTQ5QjI5OURCQjJGMTFFM0EwMkZGODhCQzc4QTZCNDY8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjE0OUIyOTlEQkIyRjExRTNBMDJGRjg4QkM3OEE2QjQ2PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozNTIyMmY1MC0yOWJiLWE0NDItOTNhOC0xZmE2MGVjNzk4M2Y8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDM6MDc6MDkrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZWM3NmY4MWUtODBmZi00NTRjLThlOWUtMDdiYmFmZjUzYjdhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAzOjA3OjUwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jb252ZXJ0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+ZnJvbSBpbWFnZS9wbmcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcDwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3A8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjA0NjJiMDE1LWNhZDctM2Q0MS1iYjlmLTFmYTM3Nzg1NzU1ZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwMzowNzo1MCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpkNjI5YTBjNC1kYWUxLTQ4NDMtYmNlYy1kOTBmZDkwOTFhZWQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDM6MDc6NTkrMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+ZGVyaXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5jb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWZlNWI4ZWMtZWE1Yi02MzRkLWI2ODctOTRkODYwYmMxOGQzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDAzOjA3OjU5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjQ4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz58brDwAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAM7SURBVHjaxNfLixxVFAbwX1X3GN8ag6IgKiooriQ+0OjCjWAi6D8w6EYQ3bhwYURwJYhuhGwkrhRHN7pzIYMgPjYG8UEwCMZFGBR1UEcz0Uky3VVuTsm1qO661VG80FTd7nvPd97n62JlZcWCq4zPNPajeK/bhxYVXmMSz+YdijMFKFHhUjyPL/EFnsMlAVYuCtAIvxGHsB8nsIVn4rsb4kw5FKCIi2O8gZ24FXdjD+7EZXg1UaQoB2oPD2I3HsFnWArQT/AY7sD9zZ1FYrAPG3g39pMkk97BJvY2Vo9bl0ftLGhZMMW1+Al/xPkqOXMc67gm9nUbYJrhom9DkBBet5T6Gb+nAEUcOgcP4byWVumqsYbv8CR+w+s4nZzZm9yvUgsuiLze2aFVezVpuIa3AqBRdOPfqOS+dP5budSCP/EyLoxYzLOgjvRcx6mO33QBjHEzdmE7A+CsiMVonjkpwA7chYsGxOCKloy5ABP8GMJPZ1hwdqRklQuwhYM4v6ce0hj8mqRo3QdwLp6ONlxluGiEY3itlaYzAcpkX/QAFMmdItdFp7AaQ2OSYcEOfB8ZNxegMetEDI3xLH92WLGd1EFvDLRmbA7ApO/QuGX2ep9PO7Kp8n+uf2g7hyMVCe9JaUun9svLyzNjME+JScdgKvtcVGYIr2NW7MenOIwDuCqlJ4sANMIvx/sxjER7eByfB12ZC5IzcA7iFtyH23APbgr28GZ035mtpezhnrfjgZi/qxGzMb7Bw7gay/NklT2W3RvPt5NaaabdRziakKx6CEBj7nVBUTaSVB0l2fdDwoHktIq0qkU7/jpIVkrXG8WOBnXJ7kUpe94XAlfxRIeAhiOt4angph+2a2MWwB68GP4e9WTZJOQcCIAz/gMyaI1n+P4wXgmu1KdEFXTzgz5elGbPrqiBzQyAKS7GV10NdBbAlUHCJhkNsTlzfY6LGvM2YxRuZAR5GnP8+BCAI3gBJzMmXBWU5+OcGDRpuhvPhvk5abqEl/BeXwyatTRr6s1pK6MhLjoWRbOZQa6mQfmP5LioqYNDeHQAYxjhlxyAOgHaHgBQJXO6zonBVrTiIauThBV1Xf+nveivAQAt4uqU7ORcMgAAAABJRU5ErkJggg==") !important',
        body_back : '#111 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAIAAAD+THXTAAAACXBIWXMAAAsTAAALEwEAmpwYAABBB2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTEyLTIzVDA2OjU0OjEwKzA5OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNy0xMi0yM1QwNjo1ODo1MCswOTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMTItMjNUMDY6NTg6NTArMDk6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjUwYTFkMjdhLTk2NWQtY2Q0Zi1iNzI0LTQ2MDJlNjk2ZDk0NTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ2ZTg2OGUwLWU3NjMtMTFlNy1hNmI0LTkzMDUzYzQzNDczNzwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjgyYmYzNDJkLWJhZWEtMzc0NS1iOWVjLTdiZGM1MDNjY2RkMTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDY6NTQ6MTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZTg0YTJiNDItMGM2MC1lYTQ2LTkxNmEtOTMwYzJhZTE2N2ExPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTEyLTIzVDA2OjU1OjIwKzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmM1MjIwMjQyLTE1MTItYTk0OC05NzVhLTY2NzM4ODliNWY0NTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0xMi0yM1QwNjo1ODo1MCswOTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1MGExZDI3YS05NjVkLWNkNGYtYjcyNC00NjAyZTY5NmQ5NDU8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMTItMjNUMDY6NTg6NTArMDk6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOmM1MjIwMjQyLTE1MTItYTk0OC05NzVhLTY2NzM4ODliNWY0NTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo4MmJmMzQyZC1iYWVhLTM3NDUtYjllYy03YmRjNTAzY2NkZDE8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjcwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjcwPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz55EBHqAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAoqSURBVHjajFvZcttADNMeaeNO+9Bm+v8falnbBzgQClCe+KHjerXagyQIHmkfHx9rrW3b1lr4sm1ba23OuW3bcRzHcWC0tbZ9fnrv+PfxeOAXfQBz11qPx8Mmbts2xmitYUh/x3/nnL33tda+77orvqT3jnWxMfyOVVprY4xxu934NH7FqtgQd6+fOSdepyu11vDeMca2bZiL7zn38XiMMfBmnhn3iFHdhq4y58RhWmu9d12do10lw1tca1E4vNc8z1qr9z7n5J7whaKzU805eeu6LcoH56F4ubQ+oBfEFfEqzBq32011A0LHejySagVUkc9T4mstvQuO8g0qPXyO44AWHccBXYWy6cupI9yYKSqeH2Pwzb3UY9MWnOHt7S2NiruErMq5YwyM6nnw2fcdbz6OA9/zHjEdr7Lp2AxGTzvXs7bWUrL8AhW38+QCdoulNuZL8i6+8qG+6bbH+/s7Dqp4YEvC7KBa0BPdh6qEYYmiBb/bmykrQwsFg6u7wGagwMSScbvdMKD3pDNplJAhdsaHuQ8aDFWXKoGbIhjQFMcYwAMKk7DJdfXNsEzFg1Knepqdfrf3Yn+w2rWW2h7+3fddNVmxi66Gc7kW9ko5c7uqDpDznBMYqNeKk2CfrbXZe8dKelaIkh7TjARvB1rQIfIB+Byex8wMo9BAWxePYa5eTeKbOoOc3ktjVWZAfTD7MRXVB/Ta8v2GFrqzK5BQRYC09Tps1vj+/bviAWGR58lt0ScakNAGKA1zCbzg+/2OS6FhqLk/Hg88ZrQGWA9TTOwlUeqnvD7XUCedPkdtgDhGf8LT8hmM4oONAt+StVDPFVHsLiB5k79CyxPxVFson/QtODlPwgeIYJBJKhLvggiRjCZRShFszrnve45ilpmGswfz35QVOQsRzEQPLHrh4PU8ybNekIPkWcYtbLdd2RQfSgfFH1+ghWq/LoO5uaeSCtrvSQ5s6YSop+LhglWIuj+MKj9QQZk/LdkD7CdJICw+kUadKeWsARKxhEBwiuR2u0Er1AWpoMx+MJmnent7U/+jUZDu2GJHntYIgQIsb7kEd7VbHvV5pF+/fnFJixDzPMQD7AZXa/FCRiKmkDgVEcwsh8cz1qJoQT1KFrttWy/9LNSXEXVpl2BDJfMYY4Bb2Hk0alTrUvNQ1pL2RpQzy8Tok0zRGBw3PjVEldAsUkHPghSLJuwibU/2knJi+Z50NmdwkROY8chNK5rjwBkRQFev4hQyAFuUUYwR0xIPVMjKeE7EO83rfz+gYELk4aixHsYLhpZYWBmNCZnBthEoW3fJx7gFzrPW+o9rMw7T7ALvG/RcEYbojN3Q/zDsMW5h8YLhkJ6HtqHZtcwRZO6ttdapvgwK9I6JYzaaATmYRxJkHEnxQOcyikl84/M8T4kHYwyDqG784DUDMJKfvMkSaxqnlPyAaHE1aqGrqSUuwrIDpy2Zxeu2GO0xs6Wgp/F22rTxEgtGiBYle6A20hdZuEE6pvbcywybsQfGycZuDS3ohfW0KQEdpfTMg3EUb04OzrsjGz4l8fHxkU7J1IYZNks1lfG2ajLxOrlM4pslmOwuVMKKB3bI4zh6qgpREkmCRIsrPCjjhXR6V/yAaKHsToegAokHlBUONhX+1fS5quZmy3gmd8YpeReZqSpRLl9L46GbLjVrrTVzu8aCM5+o/tTyeJrHJB/TpB8TupCV1lSY7oVT1nDTEt9Xxn+yB40m1E9bxUGlR7SwGCFjdUVIFbiFxrxHorOxB+gbc08ZnlIbnyDOtckAiD8at1p2ToORMvdAc1J8M79no8lEYV26qN4CNqYlj67pzIwmKBzkHkpLYLT3IhFHyyyRRqPmrHqUlqlGZYSmZ3YbgrIMm2pFmce8Sh5QZ67ugjZTBgSavi3TQ0zQejqF6liCG+z4fr8noNNLYNPGTRj2UntpHmSl5OaWn8IvoCyMU1TVmWkxlBo/fvzQfIhmFzS3qh5GOWjyA52rNcUMH1W2PIZSJ0MLPk+XSLTQFNX4+fOnAaLhgU7mBeO/iH/MpjXbmKFrk08G2xy60nPgQRkuYMNjjDMfopdNPEhXzcdKPLA8c3KZK19X4kFZX72iLDS5k7ZanhVStgybSqDkB1cc7KpskaMM8q9AKPHAamrPyoVBFiRwv9/L3AW9fsYqWqy3zH3ykuyo0IyvWRq9E2MN41lnk8D7+7uhcNbr0+LJ7sg8ytYE3CitQrm5Wp1Fe5nuLZmHJlLUnbY/f/5k/HjVMVHGp1rXKEdNellHUV21xLW1IiQI0f2cJMZyqCWxpwaXQXWpY+lty6KgalQaDzPpZZGGW6JCPfXZNGrf91RxTrjKv6nXK/HgKkwsR82DXRVtqRQaR5+0Vat3JXtgNJHn0fy12pXqpFbNVD7qT3UuKalmKvWcOIYGJv8RoqxJKaRoVwQ1kI5Y2cMzTu7dOqyYXVAhM3rVoFXrGup/bJRVd3okHZ3ZAWKRTPp4iiu9HtdOjWITB3OgigeW7kltZAzPN6tlaq2xp+PT3IPalTGAKzygBDg3o6ArvmMBjrl4uuDsilCQ6KW7JCInuSYesNXkih9kGyLnokmANm0NLZpLrPmBVOnVAeJgz8pFmU9UfqC1OvU/ltnQUc3JaKMmm6/UvxseaDRAeFA6aiUicvO1VreEuvXdaSuUWq2iBTfHaE/RInORyuWsy4X2o6Nqt9ZtpBycozNryYYWGm5A38wu2XpmQb7GOaU/hRawEUUZQFnATqujFuho/2L/QfYJXGUXSjzItlSjcCWvZ0JX9VyBV+P88wrgas0nlpm9FxGBer3EAxZwSz9BpX3xZmPlWoe2WuAznUIOxrKh7YkWz0D/ih+UtQkagKKcZueYcNS5ihY5inQVWZh2BnZCfiaTMieqbcMle9AaaUYExg/oCaBFxANeq6oW/Sw/WvX4L075+/evNjYa56d3ym5+hkxlrHHVX8dsDom2rktcVVPR5gG+kOFpho/dWKbdN1/9Gg8yT1+2FmieWWk7D0aqVULU/X7XOD/TusDAbhGBRWxlvPCV7ILGMPkGhDAlqWeAUzYvXvUU02fs+z7VpSYeaI1dR7ljnasVyKzwWgrAtCBryTqqzRaPx+Pbt29244pSz9yD1p6zf6fsTsjeBYsXMvdgf0ljfxih59H0hpWSzWFkl1T7/ft39hCU2oirIu8o1TUjUGYMzeKNHJSjCtxIUKsmGw551+RVn0B2tJTumNykjKvNJ5a9P+Wo8YOyplhksL+YP0BEkL2xigeWiTfGaaVlNRjDAxtVdptN0Zk+OKuAL+KFqyifNqAthjpXG9z658c0x+bqny9gFEsr3FkVtDgSNcpKN1n0TVZv3E97ZC0at+ws+U7ZFWB4UHrz7PR6Hr6M8vXo1qtpZTW6PyXIhHJtmODV0AtnrkubA+2WlV5mjRSv7VZHuoomymyjRgRlUtewKCHxqmqY8UL2jCdBA0XChv8NAONbx0GVv8YOAAAAAElFTkSuQmCC") repeat scroll left top !important',
        border_top : '1px solid #000 !important',
        border_left : '1px solid #000 !important',
        none : 'none !important'
    }
};

var ADD_THEME_CONNECT = {
    header_ftc : {
        'color' : [],
        'background-color' : []
    },
    chat_contents_bgc : {
        'color' : [],
        'background-color' : ['.fixed_streamer']
    },
    chat_fc : {
        'color' : ['.modal-body','.modal-content','#stream .title','#multitwitch','.search a.checked','.search a','input.conversation','input.conversation::placeholder','#btnRefreshChat','#btnIgnoreList','#btnOpenHrm','.chat-close span','#Cookie_reset','.modal-body select','.modal-body input[type="text"]','.lightbox-opened-blocked-chat','#memo_textbox','#memo_text','input.uchat_nick','div.floor label','.uchat_setting_wrap div.top','textarea'],
        'background-color' : []
    },
    color_lightest :{
        'color' : ['#view_additional_message','.conversation_contents','.conversation_contents a','div.from','#popup_ADD_quick div.title','.nav-brand','.nav-brand_mod']
    },
    color_lighter : {
        'color' : ['#stream .viewers','.btn-default','#stream .glyphicon','.large_check span','#ADD_send_location_button','#ADD_send_location_button::before','.topbar','.topbar a ','.topbar span']
    },
    color_mid : {
        'color' : ['label.btn-xxs']
    },
    color_hard : {
        'color' : ['.tagit-label'],
        'background-color' : ['.modal-body','.modal-footer','.modal-body td','.modal-content','.warp','.ADD_checkbox','::-webkit-scrollbar-track-piece','.search a']
    },
    color_harder : {
        'color' : ['.nav-brand','.nav-brand_mod'],
        'background-color' : ['::-webkit-scrollbar-track','.lightbox-opened-blocked-chat','#multitwitch','.search a.checked','.uchat_setting_wrap div.top','label.btn-xxs'],
        'border-color' : ['.modal-body td','.modal-body tr','.modal-body th','.modal-footer','.modal-body ul.tagit','#popup_ADD_quick .quick_list_title','label.btn-xxs']
    },
    color_hardest : {
        'color' : [],
        'background-color' : ['body','.conversation_contents','.chat-dostream_super','.user_conversation','.topbar','.modal-body tbody tr:hover','.btn-default','#chat-dostream .input','.large_check input','.large_check input','#Cookie_reset','.modal-body select','.modal-body input[type="text"]','#btnRefreshChat','#btnIgnoreList','#btnOpenHrm','.chat-close','::-webkit-scrollbar-thumb','#popup_ADD_quick li>a:hover','.user_menu_background','#memo_textbox','input.uchat_nick','textarea'],
        'border-color' : []
    },
    chat_container_bdc : {
        'color' : [],
        'background-color' : ['.main-streams>ul>li>a:hover','header.onstream','div.onstream','div.from','.uchat_setting_wrap div.content'],
        'border-color' : ['#chat-dostream .input','.btn-default','.chat-container','input.conversation','input[type="text"]','.topbar','#stream .main-streams>ul>li','.modal-body select','.modal-body ul','.modal-body li','textarea'],
    },
    color_complementary : {
        'color' : [],
        'background-color' : []
    },
    complementary_bgc_alpha : {
        'color' : [],
        'background-color' : ['#view_additional_message']
    },
    tagit_color: {
        'color' : ['ul.tagit li.tagit-choice','ul.tagit li span']
    },
    tagit_bgc: {
        'background-color' : ['ul.tagit li.tagit-choice:not(.ui-state-highlight)']
    },
    tagit_bg: {
        'background' : ['ui-autocomplete','.tagit-autocomplete.ui-widget-content']
    },
    tagit_bdc: {
        'border-color' : ['ul.tagit li.tagit-choice','.tagit-autocomplete.ui-widget-content']
    },
    //logo : {
    //    'background-image' : ['.nav-brand','.nav-brand_mod']
    //},
    lock_image : {
        'background-image' : ['.uchat_scroll']
    },
    body_back : {
        'background' : ['#stream .container']
    },
    border_top : {
        'border-top' : ['.topbar']
    },
    border_left : {
        'border-left' : ['#btnRefreshChat']
    },
    none : {
        'background' : ['#popup_ADD_quick .multitwitch_button .btn-default','#popup_ADD_quick div.from','.modal-body li.tagit-new input']
    }
}

function ADD_change_theme(key){
    key = key.replace(/\s/g,'');
    if(!(key in ADD_THEME)){
        key = 'Default';
    }

    if( $('#ADD_THEME_CSS').length === 0){
        $('head').append('<style id="ADD_THEME_CSS" rel="stylesheet" type="text/css"></style>');
    }
    else{
        $('#ADD_THEME_CSS').html('');
    }

    if(key == 'Default'){
        $('#ADD_THEME_CSS').html('');
        return;
    }

    var c = 'color';
    var bgc = 'background-color';
    var bdlc = 'border-left-color';

    var append_text = '';
    for(var key2 in ADD_THEME_CONNECT) {
        for(var prop in ADD_THEME_CONNECT[key2]){
            var temp_obj = ADD_THEME_CONNECT[key2][prop];
            var bt_length = temp_obj.length;
            if(bt_length !== 0){
                for(var i=0; i<bt_length; i++){
                    append_text += append_theme_line(key,temp_obj[i],prop,key2) + '\n';
                }
            }
        }

    }

    $('#ADD_THEME_CSS').append(append_text);
}

function append_theme_line(key,element,property,value){
    var key_value = ADD_THEME[key][value];
    if (key_value === undefined){
        key_value = ADD_THEME['Default'][value];
    }
    var append_text = element + ' { ' + property + ':'+ key_value +'} ';
    return append_text;
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                             HIJACKED FUNCTION
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 현재 시간 리턴용
function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function getTimeStamp(flag) {
  var d = new Date();

  var s = '' +
    leadingZeros(d.getFullYear(), 4) +
    leadingZeros(d.getMonth() + 1, 2) +
    leadingZeros(d.getDate(), 2) +
    leadingZeros(d.getHours(), 2);

    if(flag === 'm' || flag === 's'){
        s += leadingZeros(d.getMinutes(), 2);
    }

    if(flag === 's'){
        s += leadingZeros(d.getSeconds(), 2);
    }

  return s;
}

function getTimeStampWithText(d, flag) {
  if($.type(d) !== 'date'){
      return '';
  }

  var s = '' +
    d.getFullYear() + '년 ' +
    (d.getMonth() + 1) + '월 ' +
    d.getDate() + '일 ' +
    d.getHours() + '시 ';

    if(flag === 'm' || flag === 's'){
        s += d.getMinutes() + '분 ';
    }

    if(flag === 's'){
        s += d.getSeconds() + '초';
    }

  return s;
}
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 파싱 후 데이터 정리
function parse_data_from_list(flag)
{
    ADD_DEBUG('RUNNING - parse_data_from_list');
    $.ajax({
        url: "http://www.dostream.com/dev/stream_list.php",
        async: false,
        type: 'GET',
        dataType:'json',
      success:function(data) {
        var getTimeResult = '?' + getTimeStamp('m');

        // 숨길 대상 스트리머 지우기
        if(ADD_config.streamer_hide.value){
            var h_index_ary = [];
            var hide_streamer = ADD_config.streamer_hide_ID.value;
            for(var i=0; i<hide_streamer.length; i++){
                var h_index = data.map(function(o) { return o.streamer; }).indexOf(hide_streamer[i]);
                if(h_index !== -1){
                    h_index_ary.push(h_index);
                }
            }
            h_index_ary.sort(function(a, b) { // 내림차순
                return b - a;
            });

            for(var i=0; i<h_index_ary.length; i++){
                // 저장된 index가 내림차순이므로 마지막에서부터 지운다.
                data.splice(h_index_ary[i],1);
            }
        }

        // 17-09-19 : 아프리카를 메인에서 숨긴다.
        // for( var i=data.length - 1; i>0 ; i-- )
        // {
        //     if( data[i].from == 'afreeca' )
        //     {
        //         data.splice(i,1);
        //     }
        // }

        // 새로 추가한 항목 초기화
        for( var i=0; i<data.length ; i++ ){
            data[i].main_fixed = false;
            data[i].main_favorite = false;
            data[i].display_name = '';
        }

        // Twitch api 쿠키로부터 스트리머 가져오기
        if ( ADD_config.alarm.value && (!!$.cookie('twitch_api_cookie')) ){
            ADD_DEBUG('DOE 생성을 위해 Twitch API cookie 쿠키 정리 중...');
            // 로컬 변수 선언
            var temp_api_cookie = JSON.parse($.cookie('twitch_api_cookie'));
            if(temp_api_cookie === undefined || temp_api_cookie === null || temp_api_cookie.length === 0){
                ADD_DEBUG('DOE 생성 중 Twitch API cookie 확인 실패!');
                if(ADD_DEBUG_MODE) console.log(temp_api_cookie);
            }
            else{
                for( var i=0; i<temp_api_cookie.length ; i++ ){
                    var t_index = data.map(function(o) { return o.streamer; }).indexOf(temp_api_cookie[i].name);
                        if(t_index !== -1){
                            data[t_index].title = temp_api_cookie[i].status;
                            data[t_index].viewers = temp_api_cookie[i].viewers;
                            data[t_index].display_name = temp_api_cookie[i].display_name;
                            data[t_index].main_favorite = true;

                            data.splice(0, 0, data.splice(t_index, 1)[0]);
                        }
                        else{
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
        }


        // 고정 시킬 스트리머 순서 맨 위로 올리기
        if(ADD_config.top_fix.value)
        {
            var fixed_streamer = ADD_config.top_fix_ID.value;
            var alarm_streamer = ADD_config.top_alarm_ID.value;
            for(var i=fixed_streamer.length-1; i>=0; i--)
            {
                var f_index = data.map(function(o) { return o.streamer; }).indexOf(fixed_streamer[i]);
                if(f_index !== -1)
                {
                    data[f_index].main_fixed = true;
                    data.splice(0, 0, data.splice(f_index, 1)[0]);
                }
                else if(ADD_config.top_off_fix.value)
                {
                    var temp_one2 = {};

                    if( ADD_config.alarm && (!!$.cookie('twitch_api_cookie')) && ($.inArray(fixed_streamer[i],alarm_streamer) !== -1) )
                        temp_one2.title = '스트림이 오프라인 상태입니다.';
                    else
                        temp_one2.title = '스트림이 오프라인 상태이거나 메인에 없는 스트리머 추가 목록에 없습니다.';

                    temp_one2.from = 'twitch';
                    temp_one2.url = '/twitch/'+fixed_streamer[i];
                    temp_one2.image = 'http://static-cdn.jtvnw.net/previews-ttv/live_user_'+fixed_streamer[i].name+'-240x180.jpg';
                    temp_one2.streamer = fixed_streamer[i];
                    temp_one2.viewers = 0;
                    temp_one2.display_name = '';
                    temp_one2.main_fixed = true;
                    temp_one2.main_favorite = false;

                    data.unshift(temp_one2);

                    // GC
                    temp_one2 = null;
                }
            }
        }


        // display_name 채우기, 섬네일 수정하기
        for( var i=0; i<data.length ; i++ )
        {
            data[i].image += getTimeResult;
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
                    data[i].display_name = '';//data[i].streamer;
                    break;
                }
            }
        }

        ADD_run(data,flag);

      },
      error:function() {
          ADD_DEBUG('파싱 실패함');
      }
    });
}


//////////////////////////////////////////////////////////////////////////////////
// 파싱 데이터 이용하여 DOE 생성
function ADD_run(json,flag) {
    // 메인 접속 시 실행될 것들.
    checkedID = [];

	var append = '';
	ADD_DEBUG('ADD_run - 파싱된 데이터 이용하여 스트림 리스트 DOE 생성');
	//console.log('json :',json);
	$(json).each(function(k, data) {
  	  var twitch_append = '';
  	  var fixed_class = '';
  	  var fixed_append = '';
  	  var favorite_class = '';
  	  var favorite_append = '';
  	  var display_name = '';

      if(ADD_config.remember_platform.value){
          if(data.from === 'twitch' && ADD_config.remember_twitch.value){
              return true;
          }
          else if(data.from === 'kakao' && ADD_config.remember_kakao.value){
              return true;
          }
          else if(data.from === 'youtube' && ADD_config.remember_youtube.value){
              return true;
          }
      }

      if(data.from === 'twitch')
      {
          twitch_append='\
              <div class="ADD_li_box_container">\
                  <div class="ADD_li_box">\
                      <div class="ADD_checkbox_container">\
                          <label class="btn btn-default btn-xs" aria-label="멀티트위치 체크박스" data-microtip-position="top-left" role="tooltip">\
                              <input class="ADD_checkbox" type="checkbox" name="chk" value="'+data.streamer+'" onfocus="this.blur()" autocomplete="off" />\
                              <span class="glyphicon glyphicon-ok"></span>\
                          </label>\
                      </div>\
                      <div class="multitwitch_button">\
                          <a href="/#/stream/multitwitch/'+data.streamer+'">\
                              <span class="btn btn-default btn-xs" aria-label="채팅모드" data-microtip-position="top-right" role="tooltip"><span class="glyphicon glyphicon-comment"></span></span>\
                          </a>\
                      </div>\
                  </div>\
              </div>\
          ';
          if(data.display_name === ''){
              display_name = data.streamer;
          }
          else{
              display_name = data.display_name+' ('+data.streamer+')';
          }
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
          		  	display_name = data.from;
        	}
      }

      if(data.main_fixed){
          fixed_class = ' fixed_streamer';
          fixed_append = '<div style="position:relative;"><div class="glyphicon glyphicon-pushpin icon_pushpin"></div></div>';
      }
      if(data.main_favorite){
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
        $("#stream .main-streams ul").empty().hide().append(append).fadeIn(300);
    else
        $("#popup_ADD_quick ul").empty().hide().append(append).fadeIn(300);

	// GC
	append = null;
}



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                          FUNCTION - COOKIE AND config
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// 설정으로 인해 on-off 되는 이벤트는 이곳에서 관리
function ADD_event_binding(){
    // 채팅 내 이미지 preview 설정 관련됨
    if(ADD_config.imgur_preview.value !== undefined){
        ADD_chatting_arrive();
    }

    // 섬네일 마우스 오버 설정 관련됨
    if(ADD_config.thumbnail_mouse.value !== undefined){
        ADD_thumbnail_mouseover();
    }

    // 데스크탑 알림 권한 관련됨
    if(ADD_config.alarm_noti.value !== undefined && ADD_config.alarm_noti.value){
        if(ADD_DEBUG_MODE) console.log('Notification.permission = ', Notification.permission);
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    }

    // 채팅창 스크롤 관련됨
    if(ADD_config.chat_scroll.value !== undefined){
        ADD_chat_scroll_pause();
    }
}
ADD_event_binding();

//////////////////////////////////////////////////////////////////////////////////
// 설정 창에 설정 값을 덮어씌우기 위한 함수
function ADD_var_to_config_form(){
    ADD_config_var_read();
    for(var key in ADD_config){
        var ADD_ct = ADD_config[key].value;
        var ADD_config_ID_text;
        var ADD_config_type;

        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
        if (key == 'thumbnail_size')
            ADD_config_ID_text = '#ADD_config_'+key+'_'+ADD_ct;
        else
            ADD_config_ID_text = '#ADD_config_'+key;
        var ADD_config_ID = $(ADD_config_ID_text);

        // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
        if(ADD_config_ID.length === 0)
            continue;

        // 해당 ID 요소의 type 을 변수에 저장한다.
        ADD_config_type = ADD_config[key].type;//ADD_config_ID.attr('type');

        // 위에서 찾은 각 설정창 타입에 맞게 변수를 입력해준다.
        if (ADD_config_type == 'text'){
            // 1. 설정창 타입이 text 인 경우
            ADD_config_ID.val(ADD_ct);
        }
        else if (ADD_config_type == 'checkbox'){
            // 2. 설정창 타입이 checkbox 인 경우
            ADD_config_ID.prop('checked', ADD_ct);
            if(ADD_ct){
                ADD_config_ID.parent('label.btn').removeClass('active').addClass('active');
            }
        }
        else if (ADD_config_type == 'radio'){
            // 3. 설정창 타입이 radio 인 경우
            ADD_config_ID.prop('checked', true);
        }
        else if (ADD_config_type == 'tag'){
            $("#ADD_config_"+key+"_Tags").tagit("removeAll");
            for(var i=0; i<ADD_ct.length; i++){
                $("#ADD_config_"+key+"_Tags").tagit("createTag", ADD_ct[i]);
            }
        }
    }

    // 테마 관련 하드코딩
    var theme = $('#ADD_config_theme').val();
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $('#ADD_config_theme_select option:selected').text();
    });
    if(str !== theme){
        $('#ADD_config_theme_select option[value='+theme+']').prop("selected", true);
    }

    // 설정 팝업 내 체크에 따른 enable 여부 초기화
    ADD_config_enable(ADD_config_enable_init);

    // 설정 팝업 내 개발 중 옵션을 보여주는지 여부를 확인하여 초기화
    if(ADD_config.dev_on){
        $('.ADD_under_dev').show();
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 설정창 값을 변수에 저장
async function ADD_save_config_to_data(){
    // 설정 변수가 없는 경우, 기본값으로 초기화한다.
    if (ADD_config === undefined || ADD_config === null)
        ADD_config_var_read();

    for(var key in ADD_config){
        // 로컬 변수 선언
        var ADD_config_ID_text;
        var ADD_config_ID;
        var ADD_config_type;

        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
        if (key == 'thumbnail_size'){
            ADD_config_ID_text = 'input[name=ADD_config_'+key+']:checked';
        }
        else{
            ADD_config_ID_text = '#ADD_config_'+key;
        }

        ADD_config_ID = $(ADD_config_ID_text);

        // 해당 ID 값 가진 엘리먼트가 존재하지 않을 시 다음 for문으로 넘어간다.
        if(ADD_config_ID.length === 0){
            // GC
            ADD_config_ID_text = null;
            ADD_config_ID = null;
            ADD_config_type = null;

            continue;
        }

        // 해당 ID 요소의 type 을 변수에 저장한다.
        ADD_config_type = ADD_config[key].type;//ADD_config_ID.attr('type');

        // 위에서 찾은 각 설정창 타입에 맞게 쿠키에 입력한다.
        if (ADD_config_type == 'text' || ADD_config_type == 'none'){
            // 1. 설정창 타입이 text 인 경우
            ADD_config[key].value = ADD_config_ID.val();
        }
        else if (ADD_config_type == 'checkbox'){
            // 2. 설정창 타입이 checkbox 인 경우
            ADD_config[key].value = ADD_config_ID.prop('checked');
        }
        else if (ADD_config_type == 'radio'){
            // 3. 설정창 타입이 radio 인 경우
            ADD_config[key].value = ADD_config_ID.val();
        }
        else if (ADD_config_type == 'tag'){
            // 4. 설정창 타입이 tag 인 경우
            ADD_config[key].value = ADD_config_ID.val().replace(/\s/g,'').toLowerCase().split(',');
        }

        // GC
        ADD_config_ID_text = null;
        ADD_config_ID = null;
        ADD_config_type = null;
    }

    // 데이터 저장
    await ADD_config_var_write();
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                          FUNCTION -  STATUS CHECK
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// 설정 변수 초기화
function ADD_status_var_initialize()
{
    // 글로벌 변수를 가져와서 초기화 함
    ADD_status = ADD_status_init;
}

// 쿠키 쓰기
function ADD_status_cookie_write()
{
    // status 쿠키가 존재하지 않고, 전역 변수도 없는 경우
    if ((!$.cookie('ADD_status')) && (typeof ADD_status !== 'undefined') ){
        // 글로벌 변수를 가져와서 초기화 함
        ADD_status_var_initialize();
    }
    // status 쿠키가 존재하는 경우
    $.cookie('ADD_status', JSON.stringify(ADD_status), { expires : 365*2, path : '/' });
}

//////////////////////////////////////////////////////////////////////////////////
// 쿠키 지우기
function ADD_status_cookie_remove()
{
    // 설정 쿠키값이 존재하는 경우 쿠키값을 지운다.
    if (!!$.cookie('ADD_status'))
       $.removeCookie("ADD_status");
}

//////////////////////////////////////////////////////////////////////////////////
// 쿠키 읽기
function ADD_status_cookie_read()
{
    // 쿠키값 존재 시 읽어서 변수에 저장함
    if (!!$.cookie('ADD_status'))
       ADD_status = JSON.parse($.cookie('ADD_status'));
    else
       ADD_status_var_initialize();
}

//////////////////////////////////////////////////////////////////////////////////
// 값 추가 하기
function ADD_status_cookie_add_data(_key)
{
    // 읽음
    ADD_status_cookie_read();

    // 설정 변수 존재하고, 키도 존재하는 경우
    if ( (typeof ADD_status !== 'undefined') && (_key in ADD_status) ) {
       // 해당 키에 +1 함
       ADD_status[_key] = Number(ADD_status[_key]) + 1;
    }

    // 쿠키 쓰기
    ADD_status_cookie_write();
}

//////////////////////////////////////////////////////////////////////////////////
// 채팅창에 쓰기
function ADD_status_noti()
{
    ADD_send_sys_msg('두스트림 애드온이 동작 중 입니다 (v'+version_str+')',0);
    ADD_status_cookie_read();
    ADD_text = '';
    if(Number(ADD_status.ad_remove) > 0 && ADD_config.chat_adb.value){
        ADD_text += '광고 차단: '+ADD_status.ad_remove+ '회, ';
    }
    if(Number(ADD_status.auto_image) > 0 && ADD_config.imgur_preview.value){
        ADD_text += 'Imgur 로드: '+ADD_status.auto_image+ '회, ';
    }
    if(Number(ADD_status.api_call) > 0 && ADD_config.alarm.value){
        ADD_text += '\(+\) API 호출: '+ADD_status.api_call+ '회, ';
    }
    if(ADD_text !== ''){
        ADD_send_sys_msg(ADD_text,0);
    }
}

//////////////////////////////////////////////////////////////////////////////////


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
function twitch_api(){
    var ADD_config_alarm = ADD_config.alarm.value;
    var ADD_config_top_off_fix = ADD_config.top_off_fix.value;

    // ADD_config_alarm === false 이면 return.
    if(!ADD_config_alarm){
        return false;
    }

    // 로컬변수 선언
    var ADD_config_alarm_gap;
    var api_update = true;
    var api_pre_time;
    var now_time = new Date();
    var next_time;

    // 쿠키에 저장된 api 갱신 간격 검증
    ADD_config_alarm_gap = Number(ADD_config.alarm_gap.value);
    if($.isNumeric(ADD_config.alarm_gap.value) && ADD_config_alarm_gap < 1.0)
        ADD_config_alarm_gap = 1.0;

    // 업데이트 여부 계산
    if (!!$.cookie('api_check_pre_time')){
        api_pre_time = new Date($.cookie('api_check_pre_time'));
        left_time = (api_pre_time - now_time) + ADD_config_alarm_gap*60000; // 남은 시간 in ms
        api_update = left_time < 0 ;

        // 다음 업데이트 시간 계산
        next_time = new Date(api_pre_time.getTime() + ADD_config_alarm_gap*60000);
    }

    if (unique_window_check && ADD_config_alarm && (api_push_forced || api_update)){
        api_push_forced = false;

        // 쿠키 업데이트
        var api_expires = new Date();
        $.cookie('api_check_pre_time', api_expires, { expires : 365, path : '/' });
        ADD_DEBUG('Current time is '+now_time+'.\nCookie time for api update is '+api_expires+'.\nCookie is updated.');

        // cookie check
        if ((!!$.cookie('api_check_pre_time'))){
            ADD_DEBUG('All cookie checked for api');

            // 로컬 변수 선언
            var ADD_Client_ID = 'phcxzq5994awjrevkt45p6711bt77s';
            var possibleChannels = ADD_config.top_alarm_ID.value;
            var possibleChannelsString = possibleChannels.join(',').replace(' ', '');
            var possibleChannelsNo = possibleChannels.length;
            var lastNo = 0;

            if(possibleChannelsNo > 0)
            {
                ADD_DEBUG('Api call channels no. :'+possibleChannels.length + ', name : ' + possibleChannelsString.replace(' ', ''));
                $.ajax({
                     url:'https://api.twitch.tv/kraken/streams?offset=0&limit=100&channel='+possibleChannelsString.replace(' ', ''),
                     type: 'GET',
                     contentType: 'application/json',
                     dataType:'json',
                     headers: {'Client-ID': ADD_Client_ID},

                     // API CALL SUCCESS
                     success:function(channel)
                     {
                          ADD_status_cookie_add_data('api_call');
                          var temp_twitch_api_cookie = [];
                          // temp 에 이전 api 쿠키를 복사한다.
                          // 현재는 desktop alarm 이 켜진 경우만 복사한다.
                          if ( (!!$.cookie('twitch_api_cookie')) && ADD_config.alarm_noti.value)
                              temp_twitch_api_cookie = JSON.parse($.cookie('twitch_api_cookie'));//twitch_api_cookie.slice(0);

                          var streams = channel.streams;
                          var temp_body = '';
                          var noti_check = ((ADD_config.alarm_noti.value !== undefined) && ADD_config.alarm_noti.value);
                          api_expires.setMinutes( api_expires.getMinutes() + 10 );

                          ADD_DEBUG('Twitch API - noti_check', noti_check);
                          ADD_DEBUG('Twitch API - request succeeded', channel);

                          // 온라인 스트리머가 있는 경우
                          if(streams.length !== 0){
                              for (var i = 0; i < streams.length; i++) {
                                  if(i === 0){
                                      // API 변수 초기화
                                      twitch_api_cookie = [];
                                  }

                                  var stream = streams[i];
                                  if (stream !== null){
                                      twitch_api_cookie[i] = {
                                          'name' : stream.channel.name,
                                          'display_name' : stream.channel.display_name,
                                          'status' : stream.channel.status,
                                          'viewers' : stream.viewers,
                                          'game' : stream.channel.game
                                      };
                                  }

                                  var noti_options;
                                  // 데스크톱 알림 허용인 경우
                                  if( noti_check ){
                                      // 첫번째 call 이고 기존 쿠키 존재 안 하는 경우 (완전히 첫 접속인 경우)
                                      if(first_api_call && (!$.cookie('twitch_api_cookie'))){
                                          if(i !== 0){
                                              temp_body += ' ,';
                                          }
                                          temp_body += stream.channel.name;

                                          if(i === streams.length -1){
                                              ADD_DEBUG('Twitch API - 첫번째 알림', temp_body);
                                              noti_options = {
                                                    title: 'Dostream+',
                                                    options: {
                                                      body: temp_body,
                                                      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
                                                      lang: 'ko-KR'
                                                    }
                                              };
                                              $("#easyNotify").easyNotify(noti_options);
                                          }
                                      }

                                      // 기존 쿠키 존재 하는 경우
                                      else if( (!!$.cookie('twitch_api_cookie')) ){
                                          // 이전 api call 한 내역에 이번에 api call 한 이름이 있는지 체크
                                          var first_call_check = temp_twitch_api_cookie.filter(function (obj) {
                                                  return obj.name === stream.channel.name;
                                          })[0];

                                          // 이전에 call 하지 않은 스트리머인 경우 개별 데스크톱 알림
                                          if(first_call_check === undefined || first_call_check === null)
                                          {
                                              noti_options = {
                                                    title: stream.channel.display_name,
                                                    options: {
                                                      body: stream.channel.game+' - '+stream.viewers+' viewers\n'+stream.channel.status,
                                                      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
                                                      lang: 'ko-KR'
                                                    }
                                              };

                                              $("#easyNotify").easyNotify(noti_options);

                                              // GC
                                              first_call_check = null;
                                              noti_options = null;
                                          }
                                          else{
                                              ADD_DEBUG(stream.channel.name + ' : 이전에 이미 api call 하였으므로 알림하지 않음');
                                          }
                                      }
                                  }

                                  // GC
                                  stream = null;
                              } // streams 에 대한 for문 끝

                             // 쿠키 쓰기
                              $.cookie('twitch_api_cookie', JSON.stringify(twitch_api_cookie), { expires : api_expires, path : '/' });
                          }
                          // 온라인 스트리머가 없는 경우
                          else{
                              ADD_DEBUG('Twitch API - NO ONLINE STREAMER, API cookie is REMOVED');
                              $.removeCookie('twitch_api_cookie');
                          }

                          // 처음 api 호출 끝나면 false 로 바꾼다.
                          if(first_api_call)
                              first_api_call = false;

                          // GC
                          temp_twitch_api_cookie = null;
                          streams = null;
                          temp_body = null;
                          noti_check = null;

                         // 메인일 경우 리로드
                         ADD_DEBUG('Twitch API - API 호출에 의하여 메인 리로드 됨');
                         reloadMain();

                         // 채팅에 메시지 띄움
                         if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
                             var temp_date = new Date();
                             var temp_date = leadingZeros(temp_date.getFullYear(), 4) + '-' + leadingZeros(temp_date.getMonth() + 1, 2) + '-' +  leadingZeros(temp_date.getDate(), 2) + ' ' + leadingZeros(temp_date.getHours(), 2) + ':' + leadingZeros(temp_date.getMinutes(), 2) + ':' + leadingZeros(temp_date.getSeconds(), 2);
                             ADD_send_sys_msg('\(+\) Twitch API 호출 완료 ('+temp_date+')',0);
                         }
                     },

                     // API CALL ERROR
                     error:function()
                     {
                          ADD_DEBUG('Twitch API - Request failed');
                     }
                });
            }

        }
    }
    else{
        // not update
        var left_time_text = Math.floor(left_time/60/1000)+' min '+Math.floor((left_time/1000)%60)+' sec';
        ADD_DEBUG('Twitch API - 이전 API 업데이트 시간 : ',getTimeStampWithText(api_pre_time,'s'));
        ADD_DEBUG('Twitch API - 현재 시간              : ',getTimeStampWithText(now_time,'s'));
        ADD_DEBUG('Twitch API - 다음 API 업데이트 시간 : ',getTimeStampWithText(next_time,'s'));
        ADD_DEBUG('Twitch API - API 업데이트 남은 시간 : ',left_time_text);
        if ( !!$.cookie('twitch_api_cookie') ){
            // 쿠키 존재 시 변수로 쓴다.
            twitch_api_cookie = JSON.parse($.cookie('twitch_api_cookie'));
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////
// Twitch API를 주기적으로 호출하기 위한 함수
function ADD_API_CALL_INTERVAL()
{
    intervalTime = Number(ADD_config.alarm_gap.value);
    if (intervalTime < 1.0)
        intervalTime = 1.0;
    intervalTime = intervalTime*1000*60;

    if (ADD_API_SET_INTERVAL)
      clearInterval(ADD_API_SET_INTERVAL);

    ADD_API_SET_INTERVAL = setInterval(function() {
        if(ADD_DEBUG_MODE) console.log('ADD_API_CALL_INTERVAL()');

        // Write config form from cookie
        // ADD_config_var_write();

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
$.cookie('unique_window', unique_window, { expires : 30, path : '/' });

setInterval(function() {
      unique_window_cookie = Number($.cookie('unique_window'));
          if((unique_window_check === true)&&(unique_window != unique_window_cookie)){
              if(ADD_DEBUG_MODE) console.log('unique window = ',unique_window);
              if(ADD_DEBUG_MODE) console.log('unique window cookie is ',unique_window_cookie);
              unique_window_check = false;
              $('#notice_text').addClass('ADD_twitch_api_again').html('\(+\) 새 창에서 접속 감지 됨. Dostram+의 API 갱신 중지. 현재 창에서 다시 시작하려면 클릭.');
              $('#notice_text_elem').show();
              clearInterval(ADD_API_SET_INTERVAL);
            }
}, 1000);

}

function ADD_twitch_api_again(){
    if( $('.ADD_twitch_api_again').length !== 0 ){
        $('.ADD_twitch_api_again').removeClass('ADD_twitch_api_again');
        $('#notice_text').html('\(+\) Dostram+의 API 갱신 재시작^^7');
        unique_window = new Date();
        unique_window = Number(unique_window.getTime());
        $.cookie('unique_window', unique_window, { expires : 30, path : '/' });
        unique_window_check = true;
        ADD_API_CALL_INTERVAL();
    }
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                FUNCTION - DOE
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// 17-09-19 : 임시로 필요 없는 것을 숨긴다.
function ADD_temp(){
    if( $('ul.nav').length !== 0 )
        $('ul.nav').remove();
    if( $('#streamSearchForm').length !== 0 )
        $('#streamSearchForm').remove();
}
      // 임시 복구용
      ADD_temp();


//////////////////////////////////////////////////////////////////////////////////
// 설정 관련 버튼, 팝업 DOE 생성
function ADD_config_DOE()
{
      // 설정 버튼 및 팝업 생성
      $('header .container').append('\
          <div style="position:relative;width:100%;height:46px">\
              <div style="margin-left:auto;position:absolute;top:0px;right:0px;white-space:no-wrap;width:300px">\
              <div class="AD_title">\
              <div id="notice_text_elem" style="" title="Dosteam+ System Message")><span id="notice_text">문어문어문어문어<br />블러드트레일 블러드트레일</span></div>\
                 <span id="ADD_change_multi" class="btn btn-default btn_closed" aria-label="멀티트위치↔트위치 전환" data-microtip-position="left" role="tooltip">\
                    <span class="glyphicon glyphicon-resize-horizontal">\
                    </span>\
                 </span>\
                 <span id="ADD_quick_list" class="btn btn-default btn_closed" aria-label="퀵리스트" data-microtip-position="bottom" role="tooltip">\
                    <span class="glyphicon glyphicon-list">\
                    </span>\
                 </span>\
                 <span id="ADD_config" class="btn btn-default btn_closed" aria-label="설정" data-microtip-position="right" role="tooltip">\
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
                       <table class="table table-condensed" style="margin-bottom:0px;">\
                           <thead>\
                               <tr>\
                                   <th colspan="2">\
                                       <a href="https://nomomo.github.io/Addostream/" target="_blank">ADDostram v'+version_str+'</a>\
                                       <span id="new_version_available_text" style="display:none;"></span>\
                                       <a id="github_url_text" href="https://nomomo.github.io/Addostream/" target="_blank"><span style="font-weight:normal;font-size:11px;margin-left:5px;">\(https://nomomo.github.io/Addostream/\)</span></a>\
                                   </th>\
                               </tr>\
                           </thead>\
                           <tbody>\
                              <tr style="display:none;">\
                                 <td class="td_strong">테스트다</td>\
                                 <td>\
                                    <form><input name="tags" id="my" value="Apple, Orange" disabled="true" style="display:none;">\
                                    <ul id="myTags"></ul></form>\
                                 </td>\
                              </tr>\
                              <tr>\
                                   <td class="td_strong">\
                                       <label class="btn btn-default btn-xxs">\
                                           <input type="checkbox" id="ADD_config_top_fix" onfocus="this.blur()"  />\
                                           <span class="glyphicon glyphicon-ok"></span>\
                                       </label> 특정 스트리머 상단 고정\
                                   </td>\
                                   <td>\
                                       <input type="text" id="ADD_config_top_fix_ID" style="width:100%;" class="input_text_by_tag ADD_config_top_fix_form form_enabled" />\
                                       <ul id="ADD_config_top_fix_ID_Tags"></ul>\
                                   </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border"></td>\
                                 <td>\
                                 <label class="btn btn-default btn-xxs">\
                                     <input type="checkbox" id="ADD_config_top_off_fix" onfocus="this.blur()" class="ADD_config_top_fix_form form_enabled" />\
                                     <span class="glyphicon glyphicon-ok"></span>\
                                 </label> 오프라인 시에도 고정\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_alarm" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 메인에 스트리머 추가\
                                 </td>\
                                 <td><input type="text" id="ADD_config_top_alarm_ID" style="width:100%;" class="input_text_by_tag ADD_config_alarm_form form_enabled" /><ul id="ADD_config_top_alarm_ID_Tags"></ul></td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border"></td>\
                                 <td>스트리머 조회 간격(최소 1분) <input type="text" id="ADD_config_alarm_gap" style="width:20px;height:20px;padding-left:5px;" class="ADD_config_alarm_form form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border"></td>\
                                 <td>\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_alarm_noti" onfocus="this.blur()" class="ADD_config_alarm_form form_enabled" />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 온라인 시 알림\
                                     <span class="tooltip_container" aria-label="위 메인에 없는 스트리머 아이디 목록에 등록된 스트리머가 온라인이 되면 알린다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_streamer_hide" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 특정 스트리머 숨기기\
                                 </td>\
                                 <td><input type="text" id="ADD_config_streamer_hide_ID" style="width:100%;" class="input_text_by_tag ADD_config_streamer_hide_form form_enabled" /><ul id="ADD_config_streamer_hide_ID_Tags"></ul></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_remember_platform" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 특정 플랫폼 숨기기\
                                 </td>\
                                 <td>\
                                     <span style="margin-left:0px;">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_remember_twitch" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 트위치\
                                     </span>\
                                     <span style="margin-left:10px;">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_remember_kakao" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 카카오\
                                     </span>\
                                     <span style="margin-left:10px;">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_remember_youtube" class="ADD_config_remember_platform_form form_enabled" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 유투브\
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_chat_ctr" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 채팅 컨트롤\
                                     <span class="tooltip_container" aria-label="채팅 관련 기능을 활성화 한다. 채팅창에서 닉네임을 클릭하면 메모를 추가할 수 있는 기능을 기본으로 제공한다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#333;"></span>\
                                     </span>\
                                 </td>\
                                 <td>\
                                     <span aria-label="애드온의 작동 상태를 채팅창 메시지로 알림" data-microtip-position="top-left" role="tooltip">\
                                         <span style="margin-left:0px;">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_sys_meg" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 작동 상태 알림\
                                         </span>\
                                     </span>\
                                     <span style="margin-left:10px;">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_chat_adb" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label>  광고 차단\
                                     </span>\
                                     <span style="margin-left:10px;">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_hide_nick_change" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label>  닉변 메시지 차단\
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border">\
                                 </td>\
                                 <td>\
                                     <span aria-label="채팅창에서 마우스 휠을 위로 돌리면 채팅창 자동스크롤을 정지시킴" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_chat_scroll" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label>  휠로 채팅 자동스크롤 정지\
                                     </span></td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border"></td>\
                                 <td>\
                                     <span aria-label="채팅 내 좌표 링크 클릭 시 현재 창에서 열림. ctrl 또는 shift 키를 누른 채로 클릭하여 기존처럼 새 탭으로 열 수 있음." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_url_self" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label>  채팅 내 두스 좌표 현재 창 열기\
                                     </span></td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:16px;padding:2px 5px 0px 10px;"></td>\
                                 <td style="height:16px;padding:2px 5px 0px 10px;">\
                                     <span aria-label="채팅창에 imgur 링크가 채팅창에 등록되면 바로 보여줌" data-microtip-position="top-left" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_imgur_preview" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 채팅 imgur 이미지 미리보기\
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;"></td>\
                                 <td class="no_border" style="height:16px;padding:1px 5px 1px 10px;">\
                                     <span aria-label="이미지를 어둡게 가려진 상태로 보여준다." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span style="margin-left:20px;"></span>\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_imgur_preview_safe" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_imgur_preview_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 버튼 클릭 후 이미지 활성(후방주의 기능) \
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:16px;padding:0px 5px 3px 10px;"></td>\
                                 <td class="no_border" style="height:16px;padding:0px 5px 3px 10px;">\
                                     <span style="margin-left:40px;">└ 박스 투명도(0:투명, 1:불투명)</span> <input type="text" id="ADD_config_imgur_preview_opacity" style="width:32px;height:20px;padding-left:3px;" class="ADD_config_chat_ctr_form ADD_config_imgur_preview_form ADD_config_imgur_preview_safe_form form_enabled" />\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:16px;padding:3px 5px 0px 10px;"></td>\
                                 <td style="height:16px;padding:3px 5px 0px 10px;">\
                                 <label class="btn btn-default btn-xxs">\
                                     <input type="checkbox" id="ADD_config_chat_block" onfocus="this.blur()" class="ADD_config_chat_ctr_form form_enabled" />\
                                     <span class="glyphicon glyphicon-ok"></span>\
                                 </label> 금지단어 설정\
                                 <span style="margin-left:10px;">\
                                     <span aria-label="채팅이 삭제되면 &lt;message deleted&gt; 로 표시" data-microtip-position="top-left" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_chat_block_noti" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 삭제 여부 알림\
                                     </span>\
                                 </span>\
                                     <span class="tooltip_container" aria-label="특정 단어가 닉네임 또는 채팅 내용에 있으면 해당 채팅을 차단한다. 첫 접속 시 느려질 수 있다. (기본값: 신비한 곰보사전)" data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:16px;padding:1px 5px 3px 10px;"></td>\
                                 <td class="no_border" style="height:16px;padding:1px 5px 3px 10px;">\
                                 <span style="margin-left:20px;">\
                                     <span aria-label="닉네임에 금지단어가 있으면 차단" data-microtip-position="top-left" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_chat_block_nickname" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 닉네임\
                                     </span>\
                                 </span>\
                                 <span style="margin-left:10px;">\
                                     <span aria-label="채팅 내용에 금지단어가 있으면 차단" data-microtip-position="top-left" role="tooltip">\
                                         <label class="btn btn-default btn-xxs">\
                                             <input type="checkbox" id="ADD_config_chat_block_contents" onfocus="this.blur()" class="ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" />\
                                             <span class="glyphicon glyphicon-ok"></span>\
                                         </label> 내용\
                                     </span>\
                                 </span>\
                                 <span id="show_block_contents_on" style="margin-left:10px;text-decoration:underline;cursor:pointer">▼ 단어 보기</span>\
                                 <span id="show_block_contents_off" style="margin-left:10px;text-decoration:underline;cursor:pointer;display:none;">▲ 단어 숨기기</span>\
                                 <span class="tooltip_container" aria-label="차단된 채팅 보기" data-microtip-position="top-left" role="tooltip">\
                                     <span id="show_blocked_chat" style="float:right;text-decoration:underline;cursor:pointer;">Log</span>\
                                 </span>\
                                 </td>\
                              </tr>\
                              <tr>\
                                 <td class="no_border" style="height:0px;"></td>\
                                 <td class="no_border" style="height:0px;"><div id="block_contents_tr" style="display:none;">\
                                     <input type="text" id="ADD_config_chat_block_tag" style="width:100%;" class="input_text_by_tag ADD_config_chat_ctr_form ADD_config_chat_block_form form_enabled" /><ul id="ADD_config_chat_block_tag_Tags"></ul></div></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">\
                                     <label class="btn btn-default btn-xxs">\
                                         <input type="checkbox" id="ADD_config_thumbnail_mouse" class="" onfocus="this.blur()"  />\
                                         <span class="glyphicon glyphicon-ok"></span>\
                                     </label> 섬네일 마우스온 확대</td>\
                                 <td>\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_1" value="1" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 작음\
                                     </label>\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_2" value="2" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 중간\
                                     </label>\
                                     <label class="radio-inline">\
                                         <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_3" value="3" class="ADD_config_thumbnail_mouse_form form_enabled" onfocus="this.blur()"> 큼\
                                     </label>\
                                 </td>\
                              </tr>\
                              <tr class="debug_active" style="display:none;">\
                                 <td class="td_strong">개발 중 기능 표시 <span class="glyphicon glyphicon-wrench" style="color:#999;"></span> \
                                     <span class="tooltip_container" aria-label="개발 중인 기능을 보여준다. 해당 기능들은 완성되지 않았으며 불안정함." data-microtip-position="top-left" data-microtip-size="custom" role="tooltip">\
                                         <span class="glyphicon glyphicon-question-sign" style="color:#999;"></span>\
                                     </span>\
                                 </td>\
                                 <td><input type="checkbox" id="ADD_config_dev_on" onfocus="this.blur()" class="form_enabled" /></td>\
                              </tr>\
                              <tr>\
                                 <td class="td_strong">테마 (테스트 중)</td>\
                                 <td>\
                                     <span aria-label="설정 저장해야 재접속 시 유지됨." data-microtip-position="top-right" role="tooltip">\
                                     <select id="ADD_config_theme_select">\
                                         <option value="Default" selected>Default</option>\
                                         <option value="Dark">Dark</option>\
                                     </select>\
                                          <input type="text" id="ADD_config_theme" style="width:50%;display:none;" class="form_disabled" />\
                                     </span>\
                                 </td>\
                              </tr>\
                          </tbody>\
                       </table>\
                    </div>\
                    <div class="modal-footer">\
                      <!--<div class="glyphicon glyphicon-ok bg-success" style="display:block;float:left;height:30px; width:100%;padding:7px 0px;">Saved successfully!</div>-->\
                      <div id="ADD_config_Success" class="btn btn-success confirm_selection" style="display:none;">Done! 문제 발생 시 새로고침 or 재설치!</div>\
                        <button type="button" id="ADD_config_restore" class="btn btn-default btn-sm">Backup & Restore</button>\
                        <button type="button" id="Cookie_reset" class="btn btn-sm">Reset</button>\
                        <button type="button" id="ADD_config_save" class="btn btn-primary btn-sm">Save</button>\
                    </div>\
                 </div>\
              </div>\
              </div>\
              \
          </div>\
      ');


      // 디버그 모드의 경우 디버그용 버튼 및 팝업 생성
      if(ADD_DEBUG_MODE){
          $('#ADD_quick_list').before('\
                     <span id="ADD_test_button" class="btn btn-default btn_closed">\
                        <span class="glyphicon glyphicon-wrench" style="color:#999;">\
                        </span>\
                     </span>\
          ');
          $('#popup_ADD_config').before('\
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
      if($('.footer').html() !== undefined){
          var at_fix = $('.footer').html().replace('@','<div id="at" title="????">@</div>');
          $('.footer').html(at_fix);
      }

      // 자동완성 이후 처리
      var afterTagCreate = function(event, ui) {
        var tag_elem = ui.tag.children('span.tagit-label');
        var tag_text = tag_elem.html();
        if(tag_text === null || tag_text === undefined){
            return;
        }
        if(tag_text.indexOf('\(') != -1 && tag_text.indexOf('\)') != -1){
            tag_text = tag_text.split('\(')[1].split('\)')[0].replace(' ','');
            if(tag_text === undefined || tag_text === null){
                return;
            }
            if($.inArray(tag_text, streamerArray_name) != -1){
                tag_elem.html(tag_text);
            }
         }
         else {
             var temp_index = $.inArray(tag_text, streamerArray_display_name);
             if(temp_index != -1){
                 tag_elem.html(streamerArray_name[temp_index]);
             }
         }
      };

        var preprocessingTag = function(val) {
        var tag_text = val;
        if(tag_text === null || tag_text === undefined){
            return val;
        }
        if(tag_text.indexOf('\(') != -1 && tag_text.indexOf('\)') != -1){
            tag_text = tag_text.split('\(')[1].split('\)')[0].replace(' ','');
            if(tag_text === undefined || tag_text === null){
                return val;
            }
            if($.inArray(tag_text, streamerArray_name) != -1){
                return tag_text;
            }
         }
         else {
             var temp_index = $.inArray(tag_text, streamerArray_display_name);
             if(temp_index != -1){
                 return streamerArray_name[temp_index];
             }
         }
         return val;
      };

      var TagExist = function(evt, ui) {
          var new_elem = ui.existingTag.closest('ul').find('li.tagit-new input[type="text"]');
          var new_elem_text = new_elem.val();
          new_elem.val(preprocessingTag(new_elem_text));
          //addEvent('onTagExists: ' + eventTags.tagit('tagLabel', ui.existingTag));
      };

      $("#myTags").tagit({singleField: true,singleFieldNode: $('#my')});
      $("#ADD_config_top_fix_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $('#ADD_config_top_fix_ID')});
      $("#ADD_config_top_alarm_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $('#ADD_config_top_alarm_ID')});
      $("#ADD_config_streamer_hide_ID_Tags").tagit({autocomplete: {delay: 0},onTagExists:TagExist,preprocessTag:preprocessingTag,availableTags:streamerArray_AutoComplete,singleField: true,singleFieldNode: $('#ADD_config_streamer_hide_ID')});
      $("#ADD_config_chat_block_tag_Tags").tagit({autocomplete: {delay: 0},singleField: true,singleFieldNode: $('#ADD_config_chat_block_tag')});

      $("li.tagit-new").each(function() { $(this).hide(); });
      $("input:text .ui-autocomplete-input").each(function() { $(this).attr('spellcheck', false); });
}

// Theme
$(document).on('change', '#ADD_config_theme_select', function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text();
    });
    $('#ADD_config_theme').val( str );
    ADD_change_theme(str);
});

////////////////////////////////////////////////////////////////
// blocked chat
$(document).on('click', '#show_block_contents_on', function() {
    $('#block_contents_tr').slideDown('fast');
    $('#show_block_contents_on').hide();
    $('#show_block_contents_off').show();
});
$(document).on('click', '#show_block_contents_off', function() {
    $('#block_contents_tr').slideUp('fast');
    $('#show_block_contents_off').hide();
    $('#show_block_contents_on').show();
});
$(document).on('click', '#show_blocked_chat', async event => {
  $('html').addClass('no-scroll');
  var ADD_Blocked_Chat = await ADD_GetVal('ADD_Blocked_Chat');
  if(ADD_Blocked_Chat === undefined){
      ADD_Blocked_Chat = [];
  }
  var Blocked_text = '';
  if(ADD_Blocked_Chat.length === 0){
      Blocked_text = "현재 차단된 채팅이 없습니다.";
  }
  else{
      Blocked_text = ADD_Blocked_Chat.join('<br />');
  }
  $('body').append('<div class="lightbox-opened"><div class="lightbox-opened-blocked-chat"><span style="font-weight:bold;">차단된 채팅은 100개까지 저장됩니다.</span><br />'+Blocked_text+'</div></div>');
});

async function ADD_Chat_block(Elem, Contents, Chat, Condition){
    if(ADD_config !== undefined && Chat !== undefined && ADD_config.chat_block.value){
        var block_tag_array = ADD_config.chat_block_tag.value;
        if(Condition !== undefined && Condition){
            for(var i=0;i<block_tag_array.length;i++){
                if(Chat.indexOf(block_tag_array[i]) != -1){
                    var ADD_Blocked_Chat = [];
                    ADD_Blocked_Chat = await ADD_GetVal('ADD_Blocked_Chat');
                    if(ADD_Blocked_Chat === undefined){
                        ADD_Blocked_Chat = [];
                    }
                    if(ADD_Blocked_Chat.length > 100){
                        ADD_Blocked_Chat.shift();
                    }
                    ADD_Blocked_Chat.push(Contents);
                    await ADD_SetVal('ADD_Blocked_Chat', ADD_Blocked_Chat);

                    if(ADD_config.chat_block_noti.value){
                        Elem.html('<div style="text-align:center;color:#aaa;">&ltmessage deleted&gt</div>');
                    }
                    else{
                        Elem.remove();
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

////////////////////////////////////////////////////////////////////
// TAGS TEXT INPUT FOCUS EVENT
$(document).on('click', 'ul.tagit', function() {
    $(this).find("li.tagit-new").show();
    $(this).find("li.tagit-new input:text").focus();
});

$(document).on('focusout', 'li.tagit-new input:text', function() {
    $(this).closest("li.tagit-new").hide();
    $(this).val('');
});

//SPAN 영역에 클릭 이벤트 설정
$(document).on('click', 'li.tagit-choice', function(event) {
    event.stopPropagation();
});

//////////////////////////////////////////////////////////////////////////////////
// test event
$(document).on('click', '#ADD_test_id_1', function() {
    var test_text = '\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11"><span class="conversation_nick" nick="%uCF58%uC0D0%uC9F1%uC9F1%uB9E8">테스트맨</span><span style="vertical-align: middle;">&nbsp; </span><span class="cs_contents" style="">\
         테스트 https://imgur.com/a/45ps1</span></div>';
    $('.conversation_contents').append(test_text);
    test_text = null;
}); // http://imgur.com/a/cKXVX

$(document).on('click', '#ADD_test_id_2', function() {
    var test_text = '\
        <div class="user_conversation" title="테스트맨 - 2017-07-11 11:11:11">\
            <span style="color:blue">[광고] </span>\
            <span class="cs_contents" style=""><a href="http://uchat.co.kr/uchat/click.php?id=92"> 광고문의 클릭 </a></span>\
        </div>';
    $('.conversation_contents').append(test_text);
    test_text = null;
});

$(document).on('click', '#ADD_test_id_3', function() {
    var noti_options = {
          title: 'title',
          options: {
            body: 'body',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAD1BMVEU0SV5reommr7jj5ej////e05EyAAADM0lEQVR42u1ZwbGrMAwE7AJycAEcKIADBUDi/mt6h+SR2JbEGpz3Z/7s3pI4rC2tZEl0HUEQBEEQBEEQBEEQxNfh40oSkpCEJI0QP/GPSWKJ+1+QxBjjrbG5+ks0qOMVlrWtuqZk70MtC0bic5vWsZwk6cLzm7E5SaLcUBFfNSTpygU32HmSHj9KDcl8zHyFJIjRBx+lJk4QI14gWUSSp1ceTRP2XeG+tSTZutP2QjAoDxta2ktUcJW+YJJRU10bewVtw15x1hksNsmjnbgeqiLiNxW8J8nxiwre5dXC8+4vSLxuk6W22KtX8F7GNCCZ9AeFZiRGMPi2JJtFclPOuLZQ8C/JqHyPn9Edk8x6LX9dwQrJa1NDhbyDccl6KRr35QPuF0PBIsnyPpqHDWalc4EkfEoRPoqVOUoSl2x+Ar3SWzmwJEk/ovZyAMmsPXWAa0ylVJFI+jw5gDWAt8rEPOJDHlJgQFoKzru6vlgLkpjZIW2LnwcrggaoAcy7L7u0ygS0GA4FFfy6fmPioXIX6yUFd2mqnZT2db2k4C6dGglLa0hu5tBlU631JNkuKXhIssokSASryE0Fu4RE8l4Fyb0DAt5pl+QhSW+uSioiySUdVMbaCk5icREutx4iQRS86ZYZKkhGk2TVn+cgEkTBs74d2xCQghO/i7W/hzoxs/MMn7+K3WtABiO2gstQvKN9M+y4PrngxZVQC+6BUsUQaw8FvOm4xCViUmmg4MQlFxRsOa5Piggxc03Q1O242H50R+kxXsnB6fRZikXM71Z+y4bPEomrSI8r8lsQDOshl1gKzprrIAQ8FO+WOlxmb4EEu7GsreQR5EsSLEoMBReS8KWQAmQtQ4JFKhBIMGvpCi7FWZI4bHSoK7i8PAb5hdTxpFVVsHThFY8EJ4daDvZqQVpY63Qn58SbNmRrsfZHezXmja/H9M/A7Fsekk/asE6YRQBTaWmK+WoWpDhO5yjo6CYWs7996jdrsaN5yLbWe214z/z0vLxJs6JDt0uwirR5/+9YcY6Kd/2/qvVQ9jU4VsCL6OsOX2OnkqXZG04jcXcEQRAEQRAEQRAEQRAEQRAE8R/iB+f58fTfPvCwAAAAAElFTkSuQmCC',
            lang: 'ko-KR'
          }
    };

    $("#easyNotify").easyNotify(noti_options);
    noti_options = null;
});


$(document).on('click', '#ADD_test_id_4', function() {
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
    $('.conversation_contents').append(test_text);
    test_text = null;
});

$(document).on('click', '#ADD_test_id_5', function() {

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
        //if(ADD_DEBUG_MODE) console.log('urlchecker true');
        return true;
        }
    else
        {
        //if(ADD_DEBUG_MODE) console.log('urlchecker false');
        return false;
        }
}

function reloadMain(){
    if(urlchecker()){
        if(typeof newdsStream === 'function'){
            page = new newdsStream();
        }
        else{
            page = new dsStream();
        }
        page.reload();
        ADD_multitwitch_DOE();
    }
}


//////////////////////////////////////////////////////////////////////////////////
// 좌표 보내기 버튼 DOE 생성하기 위한 함수
function ADD_send_location_DOE()
{
    var ADD_chat_window_id = $('.conversation_contents'); //div.uchat_middle>div.input
    var ADD_send_location_button_id = $('#ADD_send_location_button');
    var ADD_send_location_button_elem;

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
        $('input.conversation').val(location.href).focus(); //.trigger(jQuery.Event('keypress', {keyCode: 13}))
    }
    $('#ADD_send_location_notice').hide().html(ADD_send_location_notice_text).fadeIn('fast').delay(2000).fadeOut('fast');
}

//////////////////////////////////////////////////////////////////////////////////
// 멀티트위치 관련 버튼 생성 함수
function ADD_multitwitch_DOE(){
    if( $('.search').length === 0 && $('.main-streams').length !== 0){
    $('.main-streams').prepend('<div class="search">\
        <a class="checkbox twitch checked">트위치</a><a class="checkbox kakao checked">카카오</a><a class="checkbox youtube checked">유튜브</a>\
    </div>');
    }
    else{
        console.log('search',$('.search').length === 0);
        console.log('main-streams',$('.main-streams').length !== 0);
        return;
    }
    // 멀티트위치 버튼
    if( $('#multitwitch').length === 0 )
        $('.search').append('<span aria-label="체크한 스트리머를 멀티트위치로 실행" data-microtip-position="right" role="tooltip"><span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span></span>');

    // Hide Streamer 버튼
    if( $('#addHideStreamer').length === 0 )
        $('.search').append('<span style="float:right;"><span aria-label="체크한 스트리머를 메인에서 숨김" data-microtip-position="left" role="tooltip"><span id="addHideStreamer" style="display:none; cursor: pointer; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #C64D4D none repeat scroll 0 0; color: #fff;">HIDE</span></span></span>');
}

//////////////////////////////////////////////////////////////////////////////////
// 멀티트위치 버튼 동작 관련 함수
function multitwitch_run()
{
    var multitext = checkedID.join('&');
    if(checkedID.length === 0)
        alert('Check the checkboxs to use multitwitch!');
    else
        $(location).attr('href','/#/stream/multitwitch/'+multitext);
}

//////////////////////////////////////////////////////////////////////////////////
// Hide Streamer 버튼 동작 관련 함수
async function addHideStreamer_run()
{
    var IndexCheckedID = true;
    if(checkedID.length !== 0){
        for(var i=0; i<checkedID.length; i++){
            IndexCheckedID = $.inArray(checkedID[i], ADD_config.streamer_hide_ID.value);
            if(IndexCheckedID == -1){
                (ADD_config.streamer_hide_ID.value).push(checkedID[i]);
            }
        }
        await ADD_config_var_write();
        ADD_var_to_config_form();
        reloadMain();
        $('#addHideStreamer').hide();
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 체크박스 클릭 시 이벤트
$(document).on('click', 'input[name=chk]', function() {
    var thisVal = $(this).val();
    var IndexThisVal = $.inArray(thisVal, checkedID);
    $(this).parent('label.btn').toggleClass('active');

    if(IndexThisVal === -1){
        checkedID.push(thisVal);
    }
    else{
        checkedID.splice(IndexThisVal,1);
    }

    if( $('#multitwitch').hasClass('multitwitch_ready') ){
        $('#multitwitch').removeClass('multitwitch_ready');
    }

    if($('input[name=chk]:checked').length >= 1){
        $('#addHideStreamer').fadeIn('fast');

        setTimeout(
            function() {
                $('#multitwitch').addClass('multitwitch_ready');
            },100);
    }
    else{
        $('#addHideStreamer').fadeOut('fast');
    }
});

$(document).on('click', '#popup_ADD_config table td input[type="checkbox"]', function() {
    $(this).parent('label.btn').toggleClass('active');
});

//////////////////////////////////////////////////////////////////////////////////
// run Multitwitch
$(document).on('click', '#multitwitch', function(){
    multitwitch_run();
});

//////////////////////////////////////////////////////////////////////////////////
// run addHideStreamer
$(document).on('click', '#addHideStreamer', function(){
    addHideStreamer_run();
});


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
    var imgur_return_link = [''];

    if (Imgur_type === 0)
        {
            imgur_api_call_url = imgur_api_call_url+'image/'+Imgur_ID;
        }
    else if (Imgur_type == 1)
        {
            imgur_api_call_url = imgur_api_call_url+'album/'+Imgur_ID+'/images';
        }
    else if (Imgur_type == 2)
        {
            imgur_api_call_url = imgur_api_call_url+'gallery/album/'+Imgur_ID;
        }
    else if (Imgur_type == 10)
        {
            return false;
        }
  $.ajax({
      url: imgur_api_call_url,
      async: false, // return 하기 위해 async 대신 sync를 false로 설정
      type: 'GET',
      //contentType: 'application/json',
      dataType:'json',
      headers: {
          'Authorization': 'Client-ID '+imgur_client_id
      },
    success:function(response) {
      ADD_DEBUG('Imgur api request succeed');
      var response_data = response.data;
      ADD_DEBUG('response: ',response);
      if(response_data[0] !== undefined){
          for(var i=0;i<response_data.length;i++){
              ADD_DEBUG('type:album',response_data[i].link);
              imgur_return_link[i] = response_data[i].link;
          }
      }
      else
      {
          ADD_DEBUG('type:image',response_data.link);
          imgur_return_link[0] = response_data.link;
      }
      response_data = null;
      response = null;
    },
    error:function() {
        // request failed
        ADD_DEBUG('Imgur api request failed');
    }
  });

  if(Imgur_type == 2)
  {
      // gallery 타입의 경우 album 주소를 가져오므로 첫번째 album 에 대하여 재호출한다.
      imgur_return_link = imgur_return_link[0].split('a')[1];
      if(imgur_return_link !== undefined && imgur_return_link !== null)
          imgur_return_link = getImgurData(imgur_return_link, 1);
  }

  return imgur_return_link;
}

//getImgurData('Vvb64B4', 0);
//getImgurData('Dvnw5', 1);
//var testimg = getImgurData('Tqhhv', 2);
//if(ADD_DEBUG_MODE) console.log('testimg = '+testimg);

//////////////////////////////////////////////////////////////////////////////////
// 채팅창에서 문자열 탐지, 이벤트 bind, API 함수 호출 동작 실행
async function ADD_chatting_arrive(){
   // 기존에 꺼져있는 경우
    if(!chatting_arrive_check || chatting_arrive_check === null){
        // True 이면 켠다.
        if (ADD_config.chat_ctr.value){
            chatting_arrive_check = true;
            // 오로지 이 경우만 return 하지 않는다.
        }
        // 그 외의 경우 그냥 나간다.
        else{
            return;
        }
    }
    // 기존에 켜져있는 경우
    else{
        // False 이면 끈다.
        if(!ADD_config.chat_ctr.value){
            $(document).unbindArrive('.user_conversation');
            $(document).unbindArrive('.system');
            chatting_arrive_check = false;
            return;
        }
        // 그 외의 경우 그냥 나간다.
        else{
            return;
        }
    }

    // arrive bind 및 unbind
    if(chatting_arrive_check && ADD_config.chat_ctr.value){
        // 설정이 변경되고 true 이면 false 에서 true로 바뀐 것이므로 bind 한다.
        $(document).arrive('.system', async systemElems => {
            var systemElem = $(systemElems);
            if(await ADD_Chat_block(systemElem, "SYSTEM : " + systemElem.html(), systemElem.html(), (ADD_config.chat_block_nickname.value || ADD_config.chat_block_contents.value))) return false;
            if( systemElem.html().indexOf('새로운 창에서') != -1 ){
                systemElem.addClass('ADD_chat_again').prop('title', 'Dosteam+ System Message').html('\(+\) 채팅 중지 됨. 채팅을 다시 시작하려면 클릭');
            }
            if( ADD_config.hide_nick_change.value ){
                if( systemElem.html().indexOf('로 변경') != -1 ){
                    systemElem.remove();
                }
            }
            systemElem = null;
        });

        $(document).arrive('.user_conversation', async newElems => {
            var newElem = $(newElems);
            var ADD_chatting_nickname = newElem.find('.conversation_nick').html();
            var ADD_chatting_cs_content_elem = newElem.find('.cs_contents');
            var ADD_chatting_content = ADD_chatting_cs_content_elem.html();

            // 키워드 차단 (ADD_Blocked_Chat)
            if(await ADD_Chat_block(newElem, '' + newElem.attr('title') + ' : ' + ADD_chatting_content, ADD_chatting_nickname, ADD_config.chat_block_nickname.value)) return false;
            if(await ADD_Chat_block(newElem, '' + newElem.attr('title') + ' : ' + ADD_chatting_content, ADD_chatting_content, ADD_config.chat_block_contents.value)) return false;

            if(ADD_config.chat_adb.value)
            {
                // if(ADD_chatting_content.indexOf('광고문의 클릭') !== -1 || ADD_chatting_content.indexOf('유챗2 스킨기능 오픈') !== -1)
                if( $('span:first', newElem).html().replace(/\s/g,'') == '[광고]' )
                {
                    if(ADD_DEBUG_MODE) console.log('광고 메시지 감지됨!',ADD_chatting_content);
                    newElem.remove();
                    ADD_status_cookie_add_data('ad_remove');
                }
            }

            // 메모하기
            // 메모용 쿠키 있는지 체크
            if (!!$.cookie('ADD_chat_memo')){
                // 메모용 쿠키 있으면 읽어옴
                var ADD_chat_memo = JSON.parse($.cookie('ADD_chat_memo'));
                if(ADD_chatting_nickname in ADD_chat_memo)
                {
                    newElem.find('.conversation_nick').after('<span class="conversation_memo" style="color:red;font-weight:bold;"> ['+ADD_chat_memo[ADD_chatting_nickname]+']</span>');
                }
            }

            // Imgur image preview 시
            if(ADD_config.imgur_preview.value)
            {
                var ADD_imgur_id;
                var ADD_imgur_type;
                var ADD_imgur_match;
                var ADD_imgur_link = [''];
                var ADD_imgur_DOE_text;
                var ADD_imgur_safe_screen_opacity;
                var ADD_imgur_reg = /https?:\/\/(\w+\.)?imgur.com\/(a\/|gallery\/)?(\w*)+(\.[a-zA-Z]{3})?/;
                var conversation_contents_elem;

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
                    if(ADD_DEBUG_MODE) console.log('ADD_imgur_id = '+ADD_imgur_id+'  ADD_imgur_type = '+ADD_imgur_type);
                    ADD_imgur_link = getImgurData(ADD_imgur_id, ADD_imgur_type);
                    var ADD_imgur_link_length = ADD_imgur_link.length;
                    var left_image = '';
                    var more_images = '';
                    if(ADD_imgur_link_length != 1){
                        left_image = '<div class="imgur_more_images_button" style="text-align:center;cursor:pointer;margin:2px 0px">'+(ADD_imgur_link.length-1)+'개의 이미지를 클릭하여 바로 로드.</div>';
                        for(var i=1;i<ADD_imgur_link_length;i++){
                            more_images += '<a href="'+ADD_imgur_link[i]+'" class="open-lightbox">\
                            </a>'
                        }
                        more_images = '<div class="imgur_more_images" style="display:none;">'+more_images+'</div>';
                    }

                    // imgur DOE 생성
                    if(ADD_config.imgur_preview_safe.value && ADD_imgur_link !== undefined && ADD_imgur_link !== null)
                    {
                        // 클릭시 이미지 활성화 체크 시
                        ADD_imgur_safe_screen_opacity = Number(ADD_config.imgur_preview_opacity.value);
                        if(ADD_imgur_safe_screen_opacity === undefined || ADD_imgur_safe_screen_opacity === null || !($.isNumeric(ADD_config.imgur_preview_opacity.value)))
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
                            <a href="'+ADD_imgur_link[0]+'" class="open-lightbox">\
                                <img src="'+ADD_imgur_link[0]+'" class="imgur_image_in_chat" />\
                            </a>\
                            '+more_images+'\
                            '+left_image+'\
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
                            <a href="'+ADD_imgur_link[0]+'" class="open-lightbox">\
                                <img src="'+ADD_imgur_link[0]+'" class="imgur_image_in_chat" />\
                            </a>\
                            '+more_images+'\
                            '+left_image+'\
                        </div>';
                    }

                    ADD_chatting_cs_content_elem.append(ADD_imgur_DOE_text);

                    if( isChatScrollOn() ){
                        goScrollDown();
                    }
                    ADD_status_cookie_add_data('auto_image');
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
            } // ADD_config.imgur_preview 에 대한 if문 끝


            // 채팅 두스트림 좌표 클릭 시
            if(ADD_config.url_self.value)
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
// 애드온 공지
function ADD_notice(msg, delay){
    if(delay === 0){
        if( $('#notice_text').length !== 0 ){
            $('#notice_text_elem').fadeOut(300);
            $('#notice_text').html(msg);
            $('#notice_text_elem').fadeIn(300);
        }
    }
    else{
        setTimeout(function() {
            ADD_DEBUG('length', $('#notice_text').length);
            if( $('#notice_text').length !== 0 ){
                $('#notice_text_elem').fadeOut(300);
                $('#notice_text').html(msg);
                $('#notice_text_elem').fadeIn(300);
            }
        }, delay);
    }
}

//////////////////////////////////////////////////////////////////////////////////
// 채팅창 시스템 메시지
function ADD_send_sys_msg(msg, delay){
    if(delay === 0)
    {
        if( $('.conversation_contents').length !== 0 ){
            var conversation_contents_elem = $('.conversation_contents');
            var msg_text = '<div class="system" title="Dosteam+ System Message">'+msg+'</div>';
            conversation_contents_elem.append(msg_text);
            // GC
            conversation_contents_elem = null;
            msg_text = null;

            if( isChatScrollOn() ){
                goScrollDown();
            }
        }
        else{
            ADD_DEBUG('채팅창이 없어서 다음의 메시지 출력하지 않음 - ' + msg);
        }
    }
    else{
        setTimeout(function() {
            ADD_send_sys_msg(msg, 0);
        }, delay);
    }
}



//////////////////////////////////////////////////////////////////////////////////
// 채팅창 휠감지
function ADD_chat_scroll_pause() {
    // 기존에 꺼져있는 경우
    if(!chatting_scroll_pause || chatting_scroll_pause === null)
    {
        // 둘 다 True 이면 켠다.
        if (ADD_config.chat_scroll.value && ADD_config.chat_ctr.value){
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
        if(!ADD_config.chat_scroll.value || !ADD_config.chat_ctr.value){
            ADD_DEBUG('CHAT - Scroll 이벤트 OFF');
            $(document).off('wheel.chatScrollFunc mousewheel.chatScrollFunc', '.conversation_contents');
            if( $('#view_additional_message_container').length !== 0 ){
                $('#view_additional_message_container').remove();
                $('.uchat_scroll').trigger('click');
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

    if(chatting_scroll_pause && ADD_config.chat_scroll.value && ADD_config.chat_ctr.value){
        ADD_DEBUG('CHAT - Scroll 이벤트 ON');
        $(document).on('wheel.chatScrollFunc mousewheel.chatScrollFunc', '.conversation_contents', function(event) {
            // 현재 스크롤 정지 상태 아닌 경우
            if( ADD_config.chat_scroll.value && ADD_config.chat_ctr.value && isChatScrollOn() ){

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
                    if( $(".conversation_contents").get(0).scrollHeight > $(".conversation_contents").innerHeight() ){

                        // 스크롤 정지
                        $('.uchat_scroll').trigger('click');

                        // DOE 생성
                        $('.conversation_contents').before('<div id="view_additional_message_container"><div id="view_additional_message">아래에서 추가 메시지를 확인하세요.</div></div>');
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

$(document).on('click', '.uchat_scroll', function() {
  if( ADD_config.chat_scroll.value ){
      if( !(isChatScrollOn()) && $('#view_additional_message_container').length !== 0 ){
          $('#view_additional_message_container').remove();
      }
  }
});

$(document).on('click', '#view_additional_message_container', function() {
  if( ADD_config.chat_scroll.value ){
      if( !(isChatScrollOn()) && $('#view_additional_message_container').length !== 0 ){
          //$('#view_additional_message_container').remove();
          $('.uchat_scroll').trigger('click');
      }
  }
});



//////////////////////////////////////////////////////////////////////////////////
// Open Lightbox
$(document).on('click', '.open-lightbox', function(e) {
  e.preventDefault();
  var image = $(this).attr('href');
  $('html').addClass('no-scroll');
  $('body').append('<div class="lightbox-opened"><img src="' + image + '"></div>');
});

// Close Lightbox
  $(document).on('click', '.lightbox-opened', function() {
  $('html').removeClass('no-scroll');
  $('.lightbox-opened').remove();
});


// 추가 이미지 로드
$(document).on('click', '.imgur_more_images_button', function() {
    ADD_DEBUG('imgur_more_images_button 클릭됨');
    var prev_div = $(this).prev("div.imgur_more_images");
    prev_div.find('a').each(function() { $(this).html('<img src="'+$(this).prop("href")+'" class="imgur_image_in_chat" />') });
    prev_div.show();
    $(this).remove();
});

////////////////////////////////////////////////////////////////////////////////
// thumbnail image hover event
function ADD_thumbnail_mouseover(){
    if(thumbnail_check === ADD_config.thumbnail_mouse.value)
    {
        // 이전 설정과 변경된 설정이 같으면 리턴한다.
        ADD_DEBUG('Thumbnail - 기존 thumb 이벤트 bind 설정과 같으므로 리턴한다');
        return;
    }
    else if ( (thumbnail_check === null) && (!ADD_config.thumbnail_mouse.value) )
    {
        // 초기 조건이 False 이므로 리턴한다.
        ADD_DEBUG('Thumbnail - 초기 thumb 이벤트 설정이 False 이므로 리턴한다');
        return;
    }
    else
    {
        // 이전 설정과 변경된 설정이 다르면 Global 변수를 업데이트 한다.
        ADD_DEBUG('Thumbnail - 설정 바뀌었으므로 변수 업데이트, '+ thumbnail_check +' --> ' + ADD_config.thumbnail_mouse.value);
        thumbnail_check = ADD_config.thumbnail_mouse.value;
    }

    if(!thumbnail_check)
    {
        // 설정이 변경되고 false 이면 true 에서 false 로 바뀐 것이므로 off 한다.
        ADD_DEBUG('Thumbnail - 설정 OFF');
        $(document).off('mouseenter mouseleave', 'li.twitch>a>img, li.kakao>a>img, li.youtube>a>img');
    }
    else
    {
        $(document).on({
            mouseenter: function() {
                var getTimeResult = '?' + getTimeStamp('m');
                var thumb_this = $(this);
                var thumb_this_parent = thumb_this.parent('a');
                var thumb_size_class;

                switch(ADD_config.thumbnail_size.value){
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

                var ADD_thumb_href = '';
                ADD_thumb_href = thumb_this.attr('src') + getTimeResult;
                // check image size
                switch(ADD_config.thumbnail_size.value){
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
                if( thumb_this_parent.find('.ADD_thumb_elem_container').length === 0 ){ // 기존에 섬네일 영역 존재 안 하는 경우
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
                else // 기존에 이미 존재하는 경우
                {
                    thumb_this_parent.find('.ADD_thumb_img').attr('src',ADD_thumb_href); // 주소 업데이트
                    thumb_this_parent.find('.ADD_thumb_elem_container').fadeIn('fast');
                }

                if( !(thumb_this_parent.find('.ADD_thumb_elem').hasClass(thumb_size_class)) ){
                    thumb_this_parent.find('.ADD_thumb_elem').removeClass('ADD_thumb_size_1 ADD_thumb_size_2 ADD_thumb_size_3 ADD_thumb_size_0').addClass(thumb_size_class);
                }
            },
            mouseleave:function() {
                var thumb_this = $(this);
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
    if(!ADD_config.chat_ctr.value)
        return;

    //var newElem = $(newElem);
    if( $('#do_memo_container').length !== 0 ){
        $('#do_memo_container').remove();
    }

    $('.user_menu').after('<div id="do_memo_container" style=""><div id="do_memo_inner_container" style="position:relative;top:125px;left:0;width:112px;height:61px;padding:6px 5px;background-color:red;color:#fff;font-weight:bold;cursor:pointer;"><div id="do_memo" style="height:30px;">메모하기</div><div id="do_forced_dancha" style="height:30px;">강제단차</div></div></div>');
    var save_style = $('.user_menu').attr('style');
    save_style = save_style+'position:absolute;z-index:1101;';
    $('#do_memo_container').attr('style', save_style);
    $('#do_memo_inner_container').css('top', $('.user_menu').height() );

    save_style = null;
}

// 메모 입력 DOE 생성 함수
function ADD_memo_doe(){
    if(!ADD_config.chat_ctr.value)
        return;

    var memo_nick = $('.user_nick > div').html();
    var memo_find = false;
    var memo_contents = '';
    var ADD_chat_memo;
    var memo_doe_text = '';

    // 메모용 쿠키 있는지 체크
    if (!$.cookie('ADD_chat_memo')){
        // 메모용 쿠키 없으면 메모용 쿠키 새로 생성
        ADD_chat_memo = {'key' : 'value'};
        $.cookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });
        if(ADD_DEBUG_MODE) console.log('메모 쿠키가 없어서 새로 생성');
    }
    else
    {
        // 메모용 쿠키 있으면 읽어옴
        ADD_chat_memo = JSON.parse($.cookie('ADD_chat_memo'));
        if(ADD_DEBUG_MODE) console.log('메모 쿠키 있어서 읽어옴');
    }
    // 메모용 쿠키에 아이디와 동일한 키값 있는지 검색함
    for(var key in ADD_chat_memo){
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
    $('html').addClass('no-scroll');
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
    $('body').append(memo_doe_text);

    // 확인 버튼 누르면 DOE 창 내용을 쿠키에 씀

    memo_nick = null;
    memo_find = null;
    memo_contents = null;
    ADD_chat_memo = null;
    memo_doe_text = null;
}

function ADD_memo_save_event(){
    var memo_nick = $('.user_nick > div').html();
    var memo_find = false;
    var memo_contents = '';
    var ADD_chat_memo;
    var memo_blank = false;

    // 메모용 쿠키 있는지 체크
    if (!$.cookie('ADD_chat_memo')){
        // 메모용 쿠키 없으면 메모용 쿠키 새로 생성
        ADD_chat_memo = {'key' : 'value'};
        $.cookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });
    }
    else
    {
        // 메모용 쿠키 있으면 읽어옴
        ADD_chat_memo = JSON.parse($.cookie('ADD_chat_memo'));
    }

    memo_contents = $('#memo_textbox').val();
    if(memo_contents === '' || memo_contents === null){
        memo_blank = true;
    }

    // 메모 변수 수정
    ADD_chat_memo[memo_nick] = memo_contents;

    if(memo_blank){
        delete ADD_chat_memo[memo_nick];
    }

    // 메모 쿠키 저장
    $.cookie('ADD_chat_memo', JSON.stringify(ADD_chat_memo), { expires : 365*2, path : '/' });

    $('#memo_text').fadeOut(200);
    setTimeout(function() {
        var memo_text_contents;
        if(memo_blank){
            memo_text_contents = '메모 내용이 존재하지 않으므로 메모가 삭제되었습니다. <br />나가려면 배경화면을 누르세요.';
        }
        else
        {
            memo_text_contents = '메모가 저장되었으며 새로 올라오는 채팅부터 반영됩니다. <br />나가려면 배경화면을 누르세요.';
        }
        $('#memo_text').html(memo_text_contents).fadeIn(200);

        memo_text_contents = null;
        memo_blank = null;
        memo_nick = null;
        memo_find = null;
        memo_contents = null;
        ADD_chat_memo = null;

    }, 200);

}

function ADD_forced_dancha(){
    var ADD_ignores = $.cookie('ignores');
    if(ADD_ignores === null || ADD_ignores === undefined) {
        ADD_ignores = [];
    } else {
        ADD_ignores = JSON.parse(ADD_ignores);
    }
    console.log(ADD_ignores);
    var forced_dancha_nick = $('.user_nick > div').html();
    if(forced_dancha_nick !== null || forced_dancha_nick !== undefined){
        (ADD_ignores).push(forced_dancha_nick);
        $.cookie('ignores', JSON.stringify(ADD_ignores), { expires : 365, path : '/' });
        if(ignores !== null && ignores !== undefined){
            ignores = ADD_ignores;
        }
    }
}

// 메모 DOE 생성 이벤트
$(document).on('click', '#do_memo', function() {
    ADD_memo_doe();
});

$(document).on('click', '#do_forced_dancha', function() {
    ADD_forced_dancha();
});


// Memo 창 클릭해도 안 꺼지도록 이벤트
$(document).on('click', '.lightbox-opened .modal-content', function(e) {
    e.stopPropagation();
});

// 메모 저장 이벤트
$(document).on('click', '#memo_ok', function() {
    ADD_memo_save_event();
});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    MAIN
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// Call Twitch api
twitch_api();
ADD_API_CALL_INTERVAL();


//////////////////////////////////////////////////////////////////////////////////
// Multiwindows checker
ADD_multiwindow_prevent();


///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// $(document).ready /////////////////////////////
$(document).ready(function()
{
    // CSS LOAD
    Addostream_CSS();

///////////////////////////////////////////////////////////////////////////////////
    // Hijacking
    // Firefox 의 경우
    if((web_browser === 'firefox') && (typeof exportFunction === 'function'))
    {
        newdsStream = function() {
          ADD_DEBUG('newdsStream hijacked');
          first_main_call = true;
          $('.loader_container').fadeIn(200);
        	var d = this;
        	this.reload = function() {
        		  parse_data_from_list(0);
        	};
        	$('.loader_container').fadeOut(200);
          ADD_multitwitch_DOE();
        };
        unsafeWindow.dsStream = exportFunction (newdsStream, unsafeWindow);

        function newdostream(q) {
            ADD_DEBUG('newdostream hijacked');
            q = q.split('/');
            switch(q[1]) {
                case "stream":
                    $('header').addClass("onstream");
                    $('#stream').addClass("onstream");
                    $('.footer').hide();
                    page = "stream";
                    $('#stream').load('/stream.php', {'from':q[2], 'chan':q[3]});
                break;
                default:
                    $('header').removeClass("onstream");
                    $('#stream').removeClass("onstream");
                    $('.footer').show();
                    $('#stream').load('/main2.php',function() {
                        page = new newdsStream();
                        page.reload();
                    });
                break;
            }
        }
        console.log(unsafeWindow);
        unsafeWindow.dostream = exportFunction (newdostream, unsafeWindow);

        $(document).on('click', 'header .nav-brand, header .nav-brand_mod', function(e) {
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
            ADD_DEBUG('dsStream hijacked');
            first_main_call = true;
            $('.loader_container').fadeIn(200);
          	var d = this;
          	this.reload = function() {
          		  parse_data_from_list(0);
          	};
          	$('.loader_container').fadeOut(200);
            ADD_multitwitch_DOE();
        };

        $(document).on('click', 'header .nav-brand, header .nav-brand_mod', function(e) {
            if( urlchecker() ) {
                page = new dsStream();
                page.reload();
                ADD_multitwitch_DOE();
            }
        });
    }

    setTimeout(function() {
        if(!first_main_call){
            // HIJACKING 이 늦게 발생한 경우 재호출한다.
            ADD_DEBUG('초기 접속 시 100ms 이내 메인 리로드 하지 않을 시 강제 리로드 함');
            reloadMain();
        }
    }, 100);


//////////////////////////////////////////////////////////////////////////////////
    // Arrive event 관련
    // 채팅창 생길 때 send 위한 DOE 생성, 무조건 실행됨
    $('.chat').arrive('.uchat_middle', function() { //{onceOnly:true},
        if(ADD_config.sys_meg.value !== undefined && ADD_config.sys_meg.value){
            ADD_status_noti();
        }
        ADD_send_location_DOE();
        $('.user_menu').attr('id','user_menu_id');


//////////////////////////////////////////////////////////////////////////////////
    // Memo event 관련
        // display:none 감지
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if( !$(mutations[0].target).is(':visible') )
                    if( $('#do_memo_container').length !== 0 ){
                        $('#do_memo_container').remove();
                    }
            });
        });
        // display:none 감지 할당
        var target = document.getElementById('user_menu_id');
        observer.observe(target, { attributes : true, attributeFilter : ['style'] });
        // display:none 감지 끝

    });

    $(document).arrive('.user_nick', function() {
        ADD_memo_menu_doe();
    });

    // Apply theme
    if(ADD_config.theme.value !== 'Default' && ADD_config.theme.value !== undefined){
        ADD_change_theme(ADD_config.theme.value);
    }
});


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// $(document).load /////////////////////////////
window.addEventListener ("load", function()
{
    // Create Config DOE
    ADD_config_DOE();

    // Write config form from cookie
    ADD_var_to_config_form();

    // Change Logo class name
    $('.nav-brand').removeClass('nav-brand').addClass('nav-brand_mod');

    // Create Multitwitch button DOE
    ADD_multitwitch_DOE();

    // Create Loading DOE
    $('.nav-brand_mod').empty().append('<div>dostream+</div><div class="loader_container" style="display:none;"><div class="loader" style="top:-25px;right:-30px;"></div></div>');

});


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    EVENT
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// change page check event
window.onpopstate = function() {
    var document_url = location.href;
    document_url = document_url.toLowerCase();
    var stream_url = document_url.indexOf('/stream/');
    var twitch_url = document_url.indexOf('/twitch/');
    var multitwitch_url = document_url.indexOf('/multitwitch/');
    if( (twitch_url  != -1) || (multitwitch_url  != -1) )
    {
        $('#ADD_change_multi').fadeIn(300);
    }
    else
    {
        $('#ADD_change_multi').fadeOut(300);
    }
    if( stream_url != -1)
    {
        $('#ADD_quick_list').fadeIn(300);
    }
    else
    {
        $('#ADD_quick_list').fadeOut(300);
    }

    document_url = null;
    stream_url = null;
    twitch_url = null;
    multitwitch_url = null;
};

//////////////////////////////////////////////////////////////////////////////////
// change multitwitch event
$(document).on('click', '#ADD_change_multi', function() {
    var document_url = location.href;
    var lowercase_document_url = document_url.toLowerCase();
    var stream_url = lowercase_document_url.indexOf('/stream/');
    var twitch_url = lowercase_document_url.indexOf('/twitch/');
    var multitwitch_url = lowercase_document_url.indexOf('/multitwitch/');
    var move_url = '';
    if(stream_url != -1){
        if(twitch_url != -1){
            move_url = document_url.replace('/twitch/','/multitwitch/');
            window.location.href = move_url;
        }
        else if(multitwitch_url != -1){
            move_url = document_url.replace('/multitwitch/','/twitch/');
            window.location.href = move_url;
        }
    }

    document_url = null;
    lowercase_document_url = null;
    stream_url = null;
    twitch_url = null;
    multitwitch_url = null;
    move_url = null;
});


//////////////////////////////////////////////////////////////////////////////////
// quick list popup On-Off event
$(document).on('click', '#ADD_quick_list', function() {
    if ($('#ADD_quick_list').hasClass('btn_closed'))
    {
        parse_data_from_list(1);
        $('#popup_ADD_quick').stop(true,true).fadeIn(300);
        $('#ADD_quick_list').removeClass('btn_closed').addClass('btn_opend');

        // 17-11-08 추가됨
        $('#popup_ADD_config').stop(true,true).fadeOut(300);
        $('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
    }
    else
    {
        $('#popup_ADD_quick').stop(true,true).fadeOut(300);
        $('#ADD_quick_list').removeClass('btn_opend').addClass('btn_closed');
    }
});

$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream, #popup_ADD_quick, div.footer', function() {
    if ($('#ADD_quick_list').hasClass('btn_opend'))
    {
        $('#popup_ADD_quick').stop(true,true).fadeOut(300);
        $('#ADD_quick_list').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// config popup On-Off event
$(document).on('click', '#ADD_config', function() {
    if ($('#ADD_config').hasClass('btn_closed'))
    {
        ADD_var_to_config_form();
        $('#popup_ADD_config').stop(true,true).fadeIn(300);
        $('#ADD_config').removeClass('btn_closed').addClass('btn_opend');

        $('#popup_ADD_quick').stop(true,true).fadeOut(300);
        $('#ADD_quick_list').removeClass('btn_opend').addClass('btn_closed');
    }
    else
    {
        $('#popup_ADD_config').stop(true,true).fadeOut(300);
        $('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
    }
});

$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream, div.footer', function() {
    if ($('#ADD_config').hasClass('btn_opend'))
    {
        $('#popup_ADD_config').stop(true,true).fadeOut(300);
        $('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// DEBUG popup On-Off event
$(document).on('click', '#ADD_test_button', function() {
    if ($('#ADD_test_button').hasClass('btn_closed'))
    {
        $('#popup_ADD_test').stop(true,true).fadeIn(300);
        $('#ADD_test_button').removeClass('btn_closed').addClass('btn_opend');
    }
    else
    {
        $('#popup_ADD_test').stop(true,true).fadeOut(300);
        $('#ADD_test_button').removeClass('btn_opend').addClass('btn_closed');
    }
});

$(document).on('click', 'a.nav-brand, a.nav-brand_mod, #stream, div.footer', function() {
    if ($('#ADD_test_button').hasClass('btn_opend'))
    {
        $('#popup_ADD_test').stop(true,true).fadeOut(300);
        $('ADD_test_button').removeClass('btn_opend').addClass('btn_closed');
    }
});


//////////////////////////////////////////////////////////////////////////////////
// Save cookie event

$(document).on('click', '#ADD_config_save', async event => {
    ADD_save_config();
});

async function ADD_save_config(){
    ADD_save_config_to_data();
    await ADD_config_var_write();

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

    // 이벤트 재결합
    ADD_event_binding();

    // 설정 팝업 알림 영역 표시
    $('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');

    // 메인일 경우 메인 리로드
    reloadMain();

    // 테마 재적용
    if(ADD_config.theme.value !== undefined){
        ADD_change_theme(ADD_config.theme.value);
    }
}

//////////////////////////////////////////////////////////////////////////////////
// reset cookie event
$(document).on('click', '#Cookie_reset', async event => {
    var r = confirm("모든 설정을 초기화 하려면 확인\(OK\) 버튼을 누르세요.");
    if (r == true) {
        ADD_config = deepCopy(ADD_config_init);
        await ADD_config_var_write();
        ADD_var_to_config_form();
        ADD_status_cookie_remove();

        // 블록된 채팅 로그 초기화
        var emptyArray = [];
        await ADD_SetVal('ADD_Blocked_Chat',emptyArray);

        // 메모 쿠키 초기화
        var temp_ADD_chat_memo = {'key' : 'value'};
        $.cookie('ADD_chat_memo', JSON.stringify(temp_ADD_chat_memo), { expires : 365*2, path : '/' });

        // 테마 리셋
        if(ADD_config.theme.value !== undefined){
            ADD_change_theme(ADD_config.theme.value);
        }

        // 버전 체크 데이터 리셋
        var time_check_version = new Date(Date.parse(new Date()) - 2 * 1000 * 60 * 60 * 24);
        await ADD_SetVal('time_check_version',time_check_version);

        // 설정 팝업 알림 영역 표시
        $('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');
        ADD_DEBUG('설정 리셋 완료');
    }
    else {
        alert('설정 초기화가 취소되었습니다.')
        ADD_DEBUG('설정 리셋 취소');
    }
});

//////////////////////////////////////////////////////////////////////////////////
// backup and restore event
function MD5(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

$(document).on('click', '#ADD_config_restore', async event => {
    var temp_ADD_config = await GM.getValue('ADD_config');
    var temp_ADD_chat_memo;
    if (!$.cookie('ADD_chat_memo')){
        // 메모용 쿠키 없으면 메모용 쿠키 새로 생성
        temp_ADD_chat_memo = {'key' : 'value'};
        $.cookie('ADD_chat_memo', JSON.stringify(temp_ADD_chat_memo), { expires : 365*2, path : '/' });
    }
    // 메모용 쿠키 읽어옴
    temp_ADD_chat_memo = $.cookie('ADD_chat_memo');

    var backup_text = "<<<ADD_chat_memo>>>"+temp_ADD_chat_memo+"<<<ADD_config>>>"+temp_ADD_config+"<<<END>>>";
    var MD5_key = MD5(backup_text);
    var backup_text = "<VERIFICATION_KEY:"+MD5_key+">"+backup_text;
    $('html').addClass('no-scroll');
    var backup_doe_text = '\
        <div class="lightbox-opened">\
        <div class="backup_doe" style="position: absolute; top: 50%;left:50%; width: 600px; height:300px; margin-left:-300px; margin-top:-150px;">\
        <div style="width:600px;height:200px;cursor:default;" class="modal-content">\
        <div style="padding:7px 0;font-size:12px;"><span style="font-weight:bold;">Backup & Restore - 메모 및 주요 설정 백업 및 복원</span><br />복원 방법: 아래 기존 백업한 내용을 붙여넣기 후 SAVE (버전이 다르면 복원되지 않을 수 있음)</div>\
        <textarea spellcheck="false" id="backup_textbox" style="width:90%;height:100px;font-size:11px;padding:2px;white-space: pre-wrap;word-wrap: break-all;">'+backup_text+'</textarea>\
        <div style="padding:5px 0;"><span id="backup_ok" class="btn btn-default">SAVE</span></div>\
        </div>\
        <div id="backup_text_container" style="position:relative;top:10px;left:0px; width:600px;height:30px;font-size:12px;cursor:pointer;"><span id="backup_text" style="color:#fff">저장하지 않고 나가려면 배경화면을 누르세요.</span></div>\
        </div>\
        </div>\
        ';
    $('body').append(backup_doe_text);
});

$(document).on('click', '#backup_ok', async event => {
    var temp_ADD_config = await GM.getValue('ADD_config');
    var MD5_key = MD5(temp_ADD_config);
    var restore_text = $('#backup_textbox').val();
    $('#backup_text').fadeOut(200);
    setTimeout(async () => {
        var backup_text_contents;
        var checked_text1 = restore_text.substr(0,18);
        var checked_text2 = restore_text.substr(restore_text.length-9,9);
        var checked_text3 = restore_text.indexOf('<<<ADD_chat_memo>>>');
        var checked_text4 = restore_text.indexOf('<<<ADD_config>>>');
        if(restore_text === 'DEBUG'){
            ADD_DEBUG_MODE = !(ADD_DEBUG_MODE);
            await ADD_SetVal('ADD_DEBUG_MODE', ADD_DEBUG_MODE);
            text_contents = 'DEBUG 모드: '+ADD_DEBUG_MODE;
        }
        else if(checked_text1 !== '<VERIFICATION_KEY:'){
            ADD_DEBUG('checked_text1:', checked_text1);
            text_contents = '입력한 내용에 문제가 있습니다.<br />복원할 설정은 반드시 공백 없이 "&lt;VERIFICATION_KEY:" 로 시작해야 합니다.';
        }
        else if(checked_text2 !== '<<<END>>>'){
            ADD_DEBUG('checked_text2:', checked_text2);
            text_contents = '입력한 내용에 문제가 있습니다.<br />복원할 설정은 반드시 공백 없이 "&lt;&lt;&lt;END&gt;&gt;&gt;" 로 끝나야 합니다.';
        }
        else if(checked_text3 == -1){
            ADD_DEBUG('checked_text3:', checked_text3);
            text_contents = '입력한 내용에 문제가 있습니다. 메모 정보가 없습니다.(&lt;&lt;&lt;ADD_chat_memo&gt;&gt;&gt;)';
        }
        else if(checked_text4 == -1){
            ADD_DEBUG('checked_text4:', checked_text4);
            text_contents = '입력한 내용에 문제가 있습니다. 설정 정보가 없습니다.(&lt;&lt;&lt;ADD_config&gt;&gt;&gt;)';
        }
        else{
            var restore_chat_config = restore_text.substr(51,restore_text.length - 51);
            ADD_DEBUG('restore_chat_config :', restore_chat_config);
            var validation_key = restore_text.substr(18,32);
            var restore_MD5_key = MD5(restore_chat_config);
            ADD_DEBUG('validation_key: ',validation_key);
            ADD_DEBUG('restore_validation_key: ',restore_MD5_key);
            restore_chat_config = restore_chat_config.replace('<<<END>>>','');

            if(validation_key !== restore_MD5_key){
                text_contents = 'VERIFICATION KEY가 일치하지 않아 정상적인 복원을 보증할 수 없습니다. <br />입력된 키:'+validation_key+'<br />복원한 키:'+restore_MD5_key;
            }
            else{
                var recorver_chat_memo = restore_chat_config.split("<<<ADD_chat_memo>>>")[1].split("<<<ADD_config>>>")[0];
                var restore_config = restore_chat_config.split("<<<ADD_config>>>")[1];
                ADD_DEBUG('recorver_chat_memo: ',recorver_chat_memo);
                ADD_DEBUG('restore_config: ',restore_config);

                if(recorver_chat_memo === null || recorver_chat_memo === undefined){
                    text_contents = '메모 복원 중 오류 발생!<br />나가려면 배경화면을 누르세요.';
                }
                    else if(restore_config === undefined || restore_config === null){
                        text_contents = '설정 복원 중 오류 발생!<br />나가려면 배경화면을 누르세요.';
                    }
                    else if(temp_ADD_config == restore_config){
                        text_contents = '현재 설정과 복원할 설정이 같아서 복원하지 않습니다. <br />나가려면 배경화면을 누르세요.';
                    }
                    else {
                        await GM.setValue('ADD_config', restore_config);
                        ADD_config = JSON.parse(restore_config);
                        ADD_var_to_config_form();
                        await ADD_save_config();
                        $.cookie('ADD_chat_memo', recorver_chat_memo, { expires : 365*2, path : '/' });
                        text_contents = '설정이 복원되었습니다. 문제 발생 시 확장기능에서 ADDostream을 초기화 or 삭제 후 재설치 하세요. <br /> 나가려면 배경화면을 누르세요.';
                    }
            }
        }
        $('#backup_text').html(text_contents).fadeIn(200);
    }, 200);
});

//////////////////////////////////////////////////////////////////////////////////
// config form click event
function ADD_config_enable(id){
    var id_elem = [];
    var form_class = [];
    var class_elem = [];

    // 먼저 전부 켠다.
    for(var i=0;i<ADD_config_enable_init.length;i++)
    {
        id_elem[i] = $('#'+ADD_config_enable_init[i]);
        if(id_elem[i].length === 0)
            continue;

        form_class[i] = '.'+id_elem[i].attr('id')+'_form';
        class_elem[i] = $(form_class[i]);
        if(class_elem[i].length === 0)
            continue;
        else if(class_elem[i] !== undefined){
            class_elem[i].prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
            class_elem[i].parent('label.btn').removeClass('disable');
        }
    }

    // 체크 안 된 것을 끈다.
    for(var i=0;i<ADD_config_enable_init.length;i++)
    {
        if( !(id_elem[i].is(':checked')) && (class_elem[i] !== undefined) ){
            class_elem[i].prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
            class_elem[i].parent('label.btn').addClass('disable');
        }
    }
}


for(var i=0;i<ADD_config_enable_init.length;i++)
{
    (function(id) {
    $(document).on('click', '#'+id, function() {
        ADD_config_enable([id]);
    });
    })(ADD_config_enable_init[i]);
}


//////////////////////////////////////////////////////////////////////////////////
// imgur click event
$(document).on('click', '.imgur_safe_button', function() {
    $(this).parent('.imgur_safe_screen').fadeOut(500);
});
$(document).on('click', '.imgur_control_hide', function() {
    ADD_DEBUG('Chatting 내 호출된 imgur 이미지 에서 - 버튼 클릭됨');
    $(this).closest('.imgur_container').find('.imgur_safe_screen').fadeTo(500, 0.93);
});
$(document).on('click', '.imgur_control_remove', function() {
    ADD_DEBUG('Chatting 내 호출된 imgur 이미지 에서 x 버튼 클릭됨');
    $(this).closest('.imgur_container').hide();
});

// scroll lock click event
$(document).on('click', '.uchat_scroll', function() {
    $(this).toggleClass('uchat_scroll_clicked');
});

function isChatScrollOn(){
    if( $('.uchat_scroll').length !== 0 && !($('.uchat_scroll').hasClass('uchat_scroll_clicked')) ){
        return true;
    }
    else{
        return false;
    }
}

function goScrollDown(){
    if( $('.conversation_contents').length !== 0 ){
        $('.conversation_contents').animate({ scrollTop: 1000000 }, 'fast');
    }
}





// send location click event
$(document).on('click', '#ADD_send_location_button', function() {
    ADD_send_location();
});


//////////////////////////////////////////////////////////////////////////////////
// dev on click event
$(document).on('click', '#ADD_config_dev_on', function() {
    if( true ) // ADD_config.dev_on, 체크 여부와 상관 없이 볼 수 있다.
    {
        if( $('#ADD_config_dev_on:checked').is(':checked') )
        {
            $('.ADD_under_dev').show();
        }
        else
        {
            $('.ADD_under_dev').hide();
        }
    }
});

$(document).on('click', '#at', function() {
    SIGONGJOA();
});


//////////////////////////////////////////////////////////////////////////////////
// chat again event
$(document).on('click', '.ADD_chat_again', function() {
    reloadUchat();
});


//////////////////////////////////////////////////////////////////////////////////
// api again event
$(document).on('click', '.ADD_twitch_api_again', function() {
    ADD_twitch_api_again();
});


//////////////////////////////////////////////////////////////////////////////////
function SIGONGJOA()
{
$('body').append('<div class="sigong"><div class="sigong_detail1"></div><div class="sigong_detail2"></div></div><div class="hos"></div><div style="display: none;"><audio autoplay="true" controls="" class="attach_audio" src="http://cdh0912.github.io/assets/files/시공의 폭풍은 정말 최고야.mp3" type="audio/mpeg"></audio><audio autoplay="true" controls="" class="attach_audio" src="http://cdh0912.github.io/assets/files/시공좋아시공좋아.mp3" type="audio/mpeg"></audio></div>');
$('head').append('\
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
        $('.wrap').remove();
        $('.chat').remove();
        },
        20000);

    setTimeout(
        function() {
        $('body').append('\
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
        $('.hos').fadeOut(1000);
        $('.sigong').fadeOut(1000);

        setTimeout(
            function() {
              $('#hos_movie').fadeIn(3000);
            },
            1000);
        },
        30000);
}

})();
