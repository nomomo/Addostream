// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1.21
// @grant       none
// ==/UserScript==

var version = '1.21';

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                 PRE-DEFINED
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/*
 * arrive.js
 * v2.4.1
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2017 Uzair Farooq
 */
var Arrive=function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback)}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave")}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n)},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n}},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback)},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r)},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t}}}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null)}},e.prototype.beforeAdding=function(e){this._beforeAdding=e},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e},e}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n)});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o}),i.beforeRemoving(function(e){e.observer.disconnect()}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n)},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1},i.removeEvent(t)},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1})},this},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t)})}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a)}c.call(this,e,t,r)},f},u=function(){function e(){var e={childList:!0,subtree:!0};return e}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t)})}function r(e,t){return l.matchesSelector(e,t.selector)}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r)},d},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                      CSS
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$('head').append('\
    <style id="addostreamCSS" rel="stylesheet" type="text/css">\
        .AD_title {position:absolute; top:10px; right:10px; height:30px; padding:0; font-size:11px; font-style:italic; color:#999}\
        #ADD_config {cursor:pointer;}\
        #popup_ADD_config {display:none; font-size:12px; z-index:10000; position:absolute; top:50px; right:10px; width:500px;}\
        .modal-content {\
            box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\
            background-clip: padding-box;\
            background-color: #fff;\
            border: 1px solid rgba(0, 0, 0, 0.2);\
            border-radius: 6px;\
            outline: 0 none;\
        }\
        .modal-body {\
            padding: 15px;\
        }\
        .modal-footer {\
            border-top: 1px solid #e5e5e5;\
            padding: 15px;\
            text-align: right;\
        }\
        .btn {\
            font-size: 12px;\
        }\
        .form_disabled {color:#888;}\
        .form_enabled {color:#222;}\
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
        #unique_windows_text{font-size:11px;color:#666;position:absolute; top:18px; right:70px;width:300px;height:20px;text-align:right;}\
    </style>\
');

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                  VARIABLES
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// API로 접근해서 스트리머 이름을 가져올 수도 있으나,
// API CALL 을 줄이기 위해 원래부터 두스 MAIN에 있던 스트리머 이름을 적어두기로 한다.
var streamerArray =
    [['hanryang1125','풍월량'],
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
    ['kkoma','SKT Kkoma'],
    ['1983kej','단군'],
    ['lol_peanut','SKT Peanut'],
    ['faker','SKT Faker'],
    ['nrmtzv','으음'],
    ['nicegametv','나겜'],
    ['teaminven','인벤'],
    ['capta1n_pony','포니']
    ];

var href = 'initialize';
var multitwitchID = 'hanryang1125';
var streamerID = '';
var ADD_API_SET_INTERVAL;

ADD_config_ary = [];
fixed_streamer = [];
alarm_streamer = [];
var twitch_api_cookie = [];

var ADD_config_IDs = ['ADD_config_top_fix',
                      'ADD_config_top_off_fix',
                      'ADD_config_top_fix_ID',
                      'ADD_config_alarm',
                      'ADD_config_alarm_gap',
                      'ADD_config_top_alarm_ID',
                      'ADD_config_thumbnail_mouse',
                      'ADD_config_thumbnail_size',
                      'ADD_config_streamer_hide',
                      'ADD_config_streamer_hide_ID'];


api_push_forced = false;
local_api_refresh = true;
unique_window_check = true;
backbutton_checker = false;
max_iteration = 100;
iteration = 0;
checked_box_no = 0;

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                        FUNCTION - COOKIE AND config
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// 설정 관련 쿠키 변수 초기화
function ADD_cookie_var_initialize()
{
    // 2017-07-15 수정
    // ADD_config_ary = [false, false, 'hanryang1125', false, 5, 'hanryang1125', false, 1, false, 'nalcs1, nalcs2'];
    ADD_config_ary = {
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
                         'ADD_config_last_version' : version
                      };
    
    // Object 키 길이 구하는 방법
    // ADD_config_ary_length = Object.keys(ADD_config_ary).length;
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 쿠키 삭제
function ADD_config_cookie_remove()
{
    // 설정 쿠키값이 존재하는 경우 쿠키값을 지운다.
    if (!!$.cookie('ADD_config_ary'))
       $.removeCookie("ADD_config_ary");
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 변수로부터 설정 쿠키 생성
function ADD_config_cookie_create()
{
    // 설정 변수가 존재하는 경우 해당 설정 변수로 쿠키를 생성한다.
    if (!(typeof ADD_config_ary === 'undefined'))
       $.cookie('ADD_config_ary', JSON.stringify(ADD_config_ary), { expires : 365*2, path : '/' });
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 쿠키 값을 변수에 저장
function ADD_cookie_to_var()
{
    // 설정 쿠키값이 존재하는 경우, 
    if (!!$.cookie('ADD_config_ary'))
       {
           // 쿠키값을 읽어와서 설정 변수로 만든다.
           ADD_config_ary = JSON.parse($.cookie('ADD_config_ary'));

           // text ary 관련 설정의 경우 공백을 지운 다음 콤마(,)로 나누어 변수에 저장한다.
           fixed_streamer = ADD_config_ary.ADD_config_top_fix_ID.replace(' ', '').split(',');
           alarm_streamer = ADD_config_ary.ADD_config_top_alarm_ID.replace(' ', '').split(',');
           hide_streamer = ADD_config_ary.ADD_config_streamer_hide_ID.replace(' ', '').split(',');
       }
}


//////////////////////////////////////////////////////////////////////////////////
// 설정 창에 설정 쿠키 값을 덮어씌우기 위한 함수
function ADD_cookie_to_config_form()
{
    // 설정 변수가 정의되어 있지 않은 경우 먼저 기본값으로 초기화 한다.
    if (typeof ADD_config_ary === 'undefined')
        ADD_cookie_var_initialize();
    
    // 설정 쿠키 값을 변수에 저장한다. 해당 변수 명은 ADD_config_ary 임
    ADD_cookie_to_var();
    
    for(key in ADD_config_ary)
    {
        if (key == 'ADD_config_last_version')
            {
                continue;
            }
        
        var ADD_ct = ADD_config_ary[key];
        
        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다. 
        if (key == 'ADD_config_thumbnail_size')
           var ADD_config_ID = $('#'+key+'_'+ADD_ct);
        else
           var ADD_config_ID = $('#'+key);
        
        // 해당 ID 요소의 type 을 변수에 저장한다.
        var ADD_config_type = ADD_config_ID.attr('type');
        
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
    };
    
    // form contents initialize
    ADDconfigEnable('#ADD_config_top_fix','.form_1');
    ADDconfigEnable('#ADD_config_alarm','.form_2');
    ADDconfigEnable('#ADD_config_thumbnail_mouse','.form_3');
    ADDconfigEnable('#ADD_config_streamer_hide','.form_4');
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
        if (key == 'ADD_config_last_version')
            {
                ADD_config_ary[key] = version;
                continue;
            }
        
        // 설정 key와 동일한 ID를 가진 요소를 찾아서 변수에 저장한다.
        if (key == 'ADD_config_thumbnail_size')
           {
               var ADD_config_ID = $('input[name='+key+']:checked');
           }
        else
           {
               var ADD_config_ID = $('#'+key);
           }
        
        // 해당 ID 요소의 type 을 변수에 저장한다.
        var ADD_config_type = ADD_config_ID.attr('type');
        
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
    };
    
    // 설정 쿠키를 만든다.
    ADD_config_cookie_create();
}


function ADD_last_version_checker()
{
       var temp_config = JSON.parse($.cookie('ADD_config_ary'));
       if (typeof temp_config.ADD_config_last_version === 'undefined')
           {
               // 버전 명이 아예 없으면 1.11 버전이다.
                   ADD_config_ary = {
                         'ADD_config_top_fix' : temp_config[0],
                         'ADD_config_top_off_fix' : temp_config[1],
                         'ADD_config_top_fix_ID' : temp_config[2],
                         'ADD_config_alarm' : temp_config[3],
                         'ADD_config_alarm_gap' : temp_config[4],
                         'ADD_config_top_alarm_ID' : temp_config[5],
                         'ADD_config_thumbnail_mouse' : temp_config[6],
                         'ADD_config_thumbnail_size' : temp_config[7],
                         'ADD_config_streamer_hide' : temp_config[8],
                         'ADD_config_streamer_hide_ID' : temp_config[9],
                         'ADD_config_remember_kakao' : false,
                         'ADD_config_remember_youtube' : false,
                         'ADD_config_last_version' : version
                      };
           ADD_config_cookie_create();
           }
       else if(Number(temp_config.ADD_config_last_version) !== version)
           {
               ADD_config_ary = temp_config;
               ADD_config_ary.ADD_config_last_version = version;
               ADD_config_cookie_create();
           }
}


//////////////////////////////////////////////////////////////////////////////////
// 쿠키 있는지 확인하여, 있으면 쿠키값을 변수에 저장. 없으면 생성
function ADD_main_config_cookie()
{
    if (!$.cookie('ADD_config_ary'))
    {
        // 쿠키가 없으면, 설정 변수를 초기화 한 뒤 해당 설정 변수로부터 쿠키를 만든다.
        ADD_cookie_var_initialize();
        ADD_config_cookie_create();
    }
    
    // 쿠키를 다시 변수에 쓴다.
    ADD_last_version_checker();
    ADD_cookie_to_var();
}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                              FUNCTION - API
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


// Twitch API Check
function twitch_api()
{
    ADD_config_alarm = ADD_config_ary.ADD_config_alarm;
    if(!ADD_config_alarm)
        return false;
    
    api_check_time = Number(ADD_config_ary.ADD_config_alarm_gap);
    if (api_check_time < 1.0)
      api_check_time = 1.0;

    now_time = new Date();
    api_update = true;
    if (!!$.cookie('api_check_pre_time'))
    {
        api_pre_time = new Date($.cookie('api_check_pre_time'));
        left_time = (api_pre_time - now_time); // in ms, .getTime()
        api_update = left_time < 0;
    }

    if (unique_window_check && ADD_config_alarm && (api_push_forced || api_update))
    {
        api_push_forced = false;
        // api update 

        // cookie update
        var api_expires = new Date();
        api_expires.setMinutes( api_expires.getMinutes() + api_check_time );
        $.cookie('api_check_pre_time', api_expires, { expires : api_expires, path : '/' });
        console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_expires+'.\nCookie is updated.');
        
        // cookie check        
        if ((!!$.cookie('api_check_pre_time')) && (!!$.cookie('ADD_config_ary')) ) 
        {   
            console.log('All cookie checked for api');
            // make channel id ary for api
            var possibleChannels = [];
            var ADD_Client_ID = 'phcxzq5994awjrevkt45p6711bt77s';
            
            var ADD_config_top_off_fix = ADD_config_ary.ADD_config_top_off_fix;
            var ADD_config_alarm = ADD_config_ary.ADD_config_alarm;
            
            if(ADD_config_top_off_fix && ADD_config_alarm)
                possibleChannels = concatArraysUniqueWithSort(fixed_streamer, alarm_streamer);
            else if(ADD_config_top_off_fix)
                possibleChannels = fixed_streamer;
            else if(alarm_streamer)
                possibleChannels = alarm_streamer;
            
            var possibleChannelsString = '';
            var possibleChannelsNo = possibleChannels.length;
            
            possibleChannelsString = possibleChannels.join(',').replace(' ', '');

            if(possibleChannelsNo > 0)
            {
                console.log('Api call channels no. :'+possibleChannels.length + ', name : ' + possibleChannelsString.replace(' ', ''));
                    $.ajax({ 
                         url:'https://api.twitch.tv/kraken/streams?offset=0&limit=100&channel='+possibleChannelsString.replace(' ', ''),
                         type: 'GET',
                         contentType: 'application/json',
                         dataType:'json',
                         headers: {
                           'Client-ID': ADD_Client_ID
                         },
                         success:function(channel) {
                              //request succeeded
                              console.log('api request succeeded', channel);
                              var streams = channel.streams;
                              
                              api_expires.setMinutes( api_expires.getMinutes() + 10 );
                             console.log('streams.length = ', streams.length);
                              if(streams.length === 0)
                              {
                                  console.log('API cookie is removed');
                                  $.removeCookie('twitch_api_cookie');
                              }
                              else
                              {
                              for (var i = 0; i < streams.length; i++) {
                                  var stream = streams[i];
                                  if (stream == null) {
                                      console.log(possibleChannels[i] + ' is offline');
                                  }
                                  else
                                  {
                                      twitch_api_cookie[i] = {
                                          'name' : stream.channel.name,
                                          'display_name' : stream.channel.display_name,
                                          'status' : stream.channel.status,
                                          'viewers' : stream.viewers,
                                          'game' : stream.channel.game
                                      };
                                      console.log(twitch_api_cookie[i]);
                                  };
                              };
                             
                              //console.log(twitch_api_cookie);
                              //console.log(JSON.stringify(twitch_api_cookie));
                              //api_expires.setMinutes( api_expires.getMinutes() + 10 );
                              $.cookie('twitch_api_cookie', JSON.stringify(twitch_api_cookie), { expires : api_expires, path : '/' });
                              }
                         },
                         error:function() {
                              // request failed
                              console.log('api request failed');
                         }
                    });

            }

        }
    }
    else
    {
        // not update
        left_time = Math.floor(left_time/60/1000)+' min '+Math.floor((left_time/1000)%60)+' sec';
        console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_pre_time+'.\nCookie is not updated.\nCookie will update after '+left_time);
        if (!!$.cookie('twitch_api_cookie'))
        {
           twitch_api_cookie = JSON.parse($.cookie('twitch_api_cookie'));
        }
    }
}

function ADD_API_CALL_INTERVAL()
{
    intervalTime = Number(ADD_config_ary.ADD_config_alarm_gap);
    if (intervalTime < 1)
        intervalTime = 1;
    intervalTime = intervalTime*1000*60;
    
    if (ADD_API_SET_INTERVAL)
      clearInterval(ADD_API_SET_INTERVAL);
    ADD_API_SET_INTERVAL = setInterval(function() {
    console.log('ADD_API_CALL_INTERVAL()');
    // Write config form from cookie
    ADD_cookie_to_var();
    // Call Twitch api
    twitch_api();

    }, intervalTime);
}


////////////////////////////////// UNIQUE WINDOW /////////////////////////////////

function ADD_multiwindow_prevent()
{
unique_window = new Date();
unique_window = Number(unique_window.getTime());
$.cookie('unique_window', unique_window, { expires : 30, path : '/' });

setInterval(function() {
      unique_window_cookie = Number($.cookie('unique_window'));
          if((unique_window_check==true)&&(unique_window != unique_window_cookie))
            {
              console.log('unique window = ',unique_window);
              console.log('unique window cookie is ',unique_window_cookie);
              unique_window_check = false;
              $('#unique_windows_text').show();
              clearInterval(ADD_API_SET_INTERVAL);
            }
}, 1000);

}


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                FUNCTION - DOE
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function ADD_config_DOE()
{
$('.container').append('\
    <div style="position:relative;">\
    <div id="unique_windows_text" style="display:none;">새 창에서 접속이 감지되어 API 갱신이 중지됩니다.</div>\
        <div class="AD_title">\
           <span id="ADD_config" class="btn btn-default btn_closed">\
              <span class="glyphicon glyphicon-cog">\
              </span>\
           </span>\
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
                           <td><input type="checkbox" id="ADD_config_top_off_fix" onfocus="this.blur()" class="form_1 form_enabled" /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 상단 고정 스트리머 아이디(콤마로 구분)</td>\
                           <td><input type="text" id="ADD_config_top_fix_ID" style="width:100%;" class="form_1 form_enabled" /></td>\
                        </tr>\
                        <tr class="active">\
                           <td class="td_strong">메인에 없는 스트리머 추가</td>\
                           <td><input type="checkbox" id="ADD_config_alarm" onfocus="this.blur()" /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 스트리머 조회 간격(최소 1분)</td>\
                           <td><input type="text" id="ADD_config_alarm_gap" style="width:100%;" class="form_2 form_enabled" /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 스트리머 아이디(콤마로 구분)</td>\
                           <td><input type="text" id="ADD_config_top_alarm_ID" style="width:100%;" class="form_2 form_enabled" /></td>\
                        </tr>\
                        <tr class="active">\
                           <td class="td_strong">섬네일 마우스 오버시 확대 (현재 미지원)</td>\
                           <td><input type="checkbox" id="ADD_config_thumbnail_mouse" onfocus="this.blur()"  /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 섬네일 사이즈</td>\
                           <td>\
                              <label class="radio-inline">\
                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_1" value="1" class="form_3 form_enabled" onfocus="this.blur()"> Small\
                              </label>\
                              <label class="radio-inline">\
                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_2" value="2" class="form_3 form_enabled" onfocus="this.blur()"> Medium\
                              </label>\
                              <label class="radio-inline">\
                                <input type="radio" name="ADD_config_thumbnail_size" id="ADD_config_thumbnail_size_3" value="3" class="form_3 form_enabled" onfocus="this.blur()"> Large\
                              </label>\
                          </td>\
                        </tr>\
                        <tr class="active">\
                           <td class="td_strong">특정 스트리머 메인에서 숨기기</td>\
                           <td><input type="checkbox" id="ADD_config_streamer_hide" onfocus="this.blur()" class="form_enabled" /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 숨길 스트리머 아이디(콤마로 구분)</td>\
                           <td><input type="text" id="ADD_config_streamer_hide_ID" style="width:100%;" class="form_4 form_enabled" /></td>\
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
                <div id="ADD_config_Success" class="btn btn-success confirm_selection" style="display:none;">Done!<br /> 변경사항은 새로고침 후 적용됩니다.</div>\
                  <button type="button" id="Cookie_reset" class="btn">Config reset</button>\
                  <button type="button" id="ADD_config_save" class="btn btn-primary">Save changes</button>\
              </div>\
           </div>\
        </div>\
        \
    </div>\
');
}

function urlchecker()
{
    var document_url = location.href;
    document_url = document_url.toLowerCase();
    var t_url = document_url.indexOf('twitch');
    var d_url = document_url.indexOf('kakao');
    var c_url = document_url.indexOf('youtube');
    //console.log(document_url);

    if( (t_url == -1) && (d_url == -1) && (c_url == -1) )
        {
        //console.log('urlchecker true');
        return true;
        }
    else
        {
        //console.log('urlchecker false');
        return false;
        }
}

function Addostram_run()
{
    // Add multitwitch button
    if( $('#multitwitch').length === 0 )
          $('.search').append('<span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span>');

    if( ($('.ADD_ON').length === 0) && ($('li.twitch').length > 0) )
    {
    console.log('Iteration no. is ',iteration);
    iteration = 0;
    ADD_cookie_to_var();
        $('li.twitch').each(function (j) {
        href = $(this).find('a').attr('href').replace('/#/stream/twitch/', '');
        $(this).attr('id', 'twitch_'+ href).addClass('ADD_ON');
    });
    
    // Add choosed streamer from api cookie
    var ADD_config_alarm = ADD_config_ary.ADD_config_alarm;
    console.log('ADD_config_alarm: ',ADD_config_alarm );
        
    if ( ADD_config_alarm && (!!$.cookie('twitch_api_cookie')) && (twitch_api_cookie.length>0) )
    {
       for(var w=0; w<twitch_api_cookie.length; w++)
       {
           if( $('#twitch_'+twitch_api_cookie[w].name).length === 0 )
           {
           streamerArray.push([twitch_api_cookie[w].name, twitch_api_cookie[w].display_name]);
           var ADD_star_string = '<div style="position:relative;color:#333;"><div class="glyphicon glyphicon-star" style="position:absolute;top:10px; right:25px; z-index:10;"></div></div>';
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

            $('.main-streams>ul').prepend(ADD_li_string);
           }
        }
    };
    
    
    // Fix choosed streamer on top
    var ADD_config_top_fix = ADD_config_ary.ADD_config_top_fix;
    var ADD_config_top_off_fix = ADD_config_ary.ADD_config_top_off_fix;
    
    console.log('Streamer fixed: ', ADD_config_top_fix);
    if ((!!$.cookie('ADD_config_ary')) && ADD_config_top_fix && fixed_streamer.length >= 1){
        
        for(k = 0; k < fixed_streamer.length; k++){
            var temp_streamer_href = fixed_streamer[fixed_streamer.length - k - 1].replace(' ', '');
            var temp_streamer_id = '#'+'twitch_'+temp_streamer_href;
            
            var ADD_pushpin_string = '<div style="position:relative;"><div class="glyphicon glyphicon-pushpin" style="position:absolute;top:10px; right:10px; z-index:50;"></div></div>';
            
            if(!($(temp_streamer_id).length === 0))
            {
                $(temp_streamer_id).addClass('fixed_streamer').prependTo('.main-streams>ul');
                $(temp_streamer_id).prepend(ADD_pushpin_string);
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
                $('.main-streams>ul').prepend(ADD_offline_string).prepend(ADD_pushpin_string);
            }
        }
    }
    
    // Remove choosed streamer
    var ADD_config_streamer_hide = ADD_config_ary.ADD_config_streamer_hide;
    console.log('Streamer hided: ', ADD_config_streamer_hide);
    
    for(var z=0;z<hide_streamer.length;z++)
    {
       $('#twitch_'+hide_streamer[z].replace(' ', '')).hide();
    }
    
    
    // Search twitch li
    $('li.twitch').each(function (i) {
        // get twitch id
        href = $(this).find('a').attr('href').replace('/#/stream/twitch/', '');
        
        // twitch nickname
        for(i=0; i < streamerArray.length; i++){
        if (href==streamerArray[i][0])
            {
                streamerID=streamerArray[i][1]+' ';
                break;
            }
        }
        
        $(this).find('.info>.from').html(streamerID+'('+href+')');
        $(this).append('<div style="position:relative;"><div style="position:absolute; top:-40px; right:75px; text-align:center; font-size:12px; z-index:100; margin:0;"><div class="ADD_checkbox" style="display:inline"><input style="margin-right:5px;border:none !important;" type="checkbox" name="chk" value="'+href+'" onfocus="this.blur()" /></div><div class="multitwitch_button" style="background-color:#eee; padding:5px 8px; height:15; display:inline;"><a href="/#/stream/multitwitch/'+href+'">With chat</a></div></div></div>');
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
            iteration = 0;
            console.log('Could not find the li element');
        }

    }
    
}

function multitwitch_run()
{
    multitwitchID = '';
    $("input[name=chk]:checked").each(function() {
        if(multitwitchID==='')
           multitwitchID = $(this).val();
        else
           multitwitchID = multitwitchID+'&'+$(this).val();
    });
    //alert(multitwitchID);
    if(multitwitchID==='')
        alert('Check the checkboxs to use multitwitch!');
    else
        $(location).attr('href','/#/stream/multitwitch/'+multitwitchID);
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                               FUNCTION - CHAT
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/*
$('.chat').arrive('.user_conversation', function(newElem) {
     var $newElem = $(newElem);
    
    // nickname
    console.log($newElem.find('.conversation_nick').html());
    
    // chat content
    console.log($newElem.find('.cs_contents').html());
    
});
*/

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    MAIN
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Check cookie
ADD_main_config_cookie();

// Make config DOE
ADD_config_DOE();

// Write config form from cookie
ADD_cookie_to_config_form();

// Call Twitch api
twitch_api();
ADD_API_CALL_INTERVAL();

// Multiwindows checker
ADD_multiwindow_prevent();

// Run 

$(document).ready(function(){
// 재생화면에서 실행 방지
    if (urlchecker())
       Addostram_run();
    else
       {
       backbutton_checker = true;
       console.log('In playing!');
       }
       
});


$('.container>a').click(function(){
    backbutton_checker = false;
    ADD_cookie_to_var();
    twitch_api();
    
    /*
    setTimeout(
        function() {
            Addostram_run();
        },
        100);
    */
    
    Addostram_run();
});

// hash change event
// 2017.07.09
// Backbutton 으로 인한 오류 방지
// li 클릭하여 재생 중 화면으로 올 경우 backbutton_checker 는 true 가 된다.
// 혹은 주소로 바로 갈 경우에도 동일하다.
// 페이지 변경을 탐지한 뒤, 백버튼 체킹되고 메인페이지인 경우 Addostram_run 함수 작동시킨다.
window.onpopstate = function(event) {
     console.log('url checker = ', urlchecker());
     //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
     if( backbutton_checker && urlchecker() ) //(!$('#stream').hasClass('onstream')) )
     {
        console.log("Back button dectected. " + "location: " + document.location);
        ADD_cookie_to_var();
        twitch_api();
        Addostram_run();
        backbutton_checker = false;
     };
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//                                    EVENT
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// run Multitwitch
$(document).on("click", "#multitwitch", multitwitch_run);

// li click event
$(document).on("click", "li.twitch, .multitwitch_button", function() {
    backbutton_checker = true;
});

// config popup On-Off script

$('#ADD_config').on('click', function() {
    if ($('#ADD_config').hasClass('btn_closed'))
    {
        ADD_cookie_to_config_form();
        $('#popup_ADD_config').stop(true,true).fadeIn(300);
        $('#ADD_config').removeClass('btn_closed').addClass('btn_opend');
        console.log('config popup open');
    }
    else
    {
        //ADD_cookie_to_config_form();
        $('#popup_ADD_config').stop(true,true).fadeOut(300);
        $('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
        console.log('config popup close');
    }    
});

$('a.nav-brand, #stream').on('click', function() {
    if ($('#ADD_config').hasClass('btn_opend'))
    {
        //ADD_cookie_to_config_form();
        $('#popup_ADD_config').stop(true,true).fadeOut(300);
        $('#ADD_config').removeClass('btn_opend').addClass('btn_closed');
    }
});


// save cookie event

$('#ADD_config_save').on('click', function() {
    ADD_save_config_to_cookie();
    ADD_cookie_to_var();
    $('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');
    if (local_api_refresh == true)
    {
      local_api_refresh = false;
      api_push_forced = true;
        
      twitch_api();
      ADD_API_CALL_INTERVAL();
      setTimeout(function() {
      local_api_refresh = true;
      }, 5000);
    }
});

// reset cookie event

$('#Cookie_reset').on('click', function() {
    ADD_cookie_var_initialize();
    ADD_config_cookie_remove();
    ADD_main_config_cookie();
    ADD_cookie_to_config_form();
    ADD_cookie_to_var();
    $('#ADD_config_Success').fadeIn('1000').delay('3000').fadeOut('1000');
    console.log('cookie reset!');
});



// checkbox click event
// 체크박스가 체크되면 멀티트위치 버튼을 강조표시한다.
    $(document).on('change','input[name=chk]',function(){
        if( $('#multitwitch').hasClass('multitwitch_ready') )
            $('#multitwitch').removeClass('multitwitch_ready');
        
        if($('input[name=chk]:checked').length >= 1)
        {
            setTimeout(
                function() {
                    $('#multitwitch').addClass('multitwitch_ready');
                },
                100);
        }
    });




// config form click event

function ADDconfigEnable(a, b)
{
    //console.log('ADDconfigEnable');
    if($(a).is(':checked'))
        $(b).prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
    else
        $(b).prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
}

$('#ADD_config_top_fix').on('click', function() {
    ADDconfigEnable('#ADD_config_top_fix','.form_1');
});

$('#ADD_config_alarm').on('click', function() {
    ADDconfigEnable('#ADD_config_alarm','.form_2');
});

$('#ADD_config_thumbnail_mouse').on('click', function() {
    ADDconfigEnable('#ADD_config_thumbnail_mouse','.form_3');
});

$('#ADD_config_streamer_hide').on('click', function() {
    ADDconfigEnable('#ADD_config_streamer_hide','.form_4');
});

