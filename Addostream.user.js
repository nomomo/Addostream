// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1.05
// @grant       none
// ==/UserScript==


// 크로스 도메인 관련 예제, 나중에 추가할 일 있으면 사용하려고 함.
// 참고페이지 http://gooranet.tistory.com/68
/*
function cross_domain(url)
{
    var req_obj = new Object();
    req_obj.method = 'GET';
    req_obj.url = url;
    req_obj.onload = function(responseDetails) 
    { 
        var body = document.getElementsByTagName("body")[0];
        var span = document.createElement("span");
        var result = document.createTextNode(responseDetails.responseText);
        span.appendChild(result);
        body.appendChild(span);
    } 
    GM_xmlhttpRequest(req_obj); 
}

var url = "http://www.goora.net/gm2.html";
cross_domain(url);
*/

// $.getScript("~.js");
// ref. 1 https://www.w3schools.com/jquery/ajax_getscript.asp
// ref. 2 https://stackoverflow.com/questions/7980798/jquery-dynamic-loading-of-external-script-files-before-document-ready

var version = '1.05';
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
    ['kkoma','SKT Kkoma'],
    ['1983kej','단군'],
    ['lol_peanut','SKT Peanut'],
    ['faker','SKT Faker']
    ];
var href = 'initialize';
var streamerID = '';
var multitwitchID = 'hanryang1125';
var ADD_setup_Ary = [];


// function

function cookie_initialize()
{
    ADD_setup_Ary = [false, false, 'hanryang1125', false, 5, 'hanryang1125', ''];
}

function cookie_applied_to_setup()
{
    if (typeof ADD_setup_Ary === 'undefined')
        cookie_initialize();
    $('#ADD_setup_top_fix').prop('checked', ADD_setup_top_fix);
    $('#ADD_setup_top_off_fix').prop('checked', ADD_setup_top_off_fix);
    $('#ADD_setup_top_fix_ID').val(ADD_setup_top_fix_ID);
    $('#ADD_setup_alarm').prop('checked', ADD_setup_alarm);
    $('#ADD_setup_alarm_gap').val(ADD_setup_alarm_gap);
    $('#ADD_setup_top_alarm_ID').val(ADD_setup_top_alarm_ID);
    $('#ADD_setup_Client_ID').val(ADD_setup_Client_ID);
}

function cookie_setup_remove()
{
    $.removeCookie("ADD_setup_Ary");
}



//////////////////////////////////////////////////////////////////////////////////
// CSS

$('head').append('\
    <style id="addostreamCSS" rel="stylesheet" type="text/css">\
        .AD_title {position:absolute; top:0px; right:10px; height:63px; padding:25px 0; font-size:11px; font-style:italic; color:#999}\
        #ADD_setup {cursor:pointer;}\
        #popup_ADD_setup {display:none; font-size:12px; z-index:10000; position:absolute; top:70px; right:10px; width:500px;}\
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
        .fixed_streamer{background-color:#f5f5f5;}\
    </style>\
');

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// Setup cookie

function cookie_to_variable()
{
    if (!!$.cookie('ADD_setup_Ary'))
        ADD_setup_Ary = JSON.parse($.cookie('ADD_setup_Ary'));
    ADD_setup_top_fix = ADD_setup_Ary[0];
    ADD_setup_top_off_fix = ADD_setup_Ary[1];
    ADD_setup_top_fix_ID = ADD_setup_Ary[2];
    ADD_setup_alarm = ADD_setup_Ary[3];
    ADD_setup_alarm_gap = Number(ADD_setup_Ary[4]);
    ADD_setup_top_alarm_ID = ADD_setup_Ary[5];
    ADD_setup_Client_ID = ADD_setup_Ary[6];
    
    fixed_streamer = ADD_setup_top_fix_ID.replace(' ', '').split(',');
    alarm_streamer = ADD_setup_top_alarm_ID.replace(' ', '').split(',');
}

function setup_cookie()
{
    if (!!$.cookie('ADD_setup_Ary')){
        // read cookie ary
        ADD_setup_Ary = JSON.parse($.cookie('ADD_setup_Ary'));
        //alert('setup cookie exist');
    }
    else
    // if there is no cookie
    {
        cookie_initialize();
        // write cookie ary
        $.cookie('ADD_setup_Ary', JSON.stringify(ADD_setup_Ary), { expires : 365*2, path : '/' });
        //alert('new setup cookie');
    }
    cookie_to_variable();

}
setup_cookie();

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// cookie for api


// 배열 병합 함수
var concatArraysUniqueWithSort = function (thisArray, otherArray) {
    var newArray = thisArray.concat(otherArray).sort(function (a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
    });

    return newArray.filter(function (item, index) {
        return newArray.indexOf(item) === index;
    });
};


// twitch api check
function twitch_api()
{
    api_check_time = ADD_setup_alarm_gap;
    now_time = new Date();
    api_update = true;
    if (!!$.cookie('api_check_pre_time'))
    {
        api_pre_time = new Date($.cookie('api_check_pre_time'));
        left_time = (api_pre_time - now_time); // in ms, .getTime()
        api_update = left_time < 0;
    }

    if (api_update)
    {
        // api update 

        // cookie update
        var api_expires = new Date();
        api_expires.setMinutes( api_expires.getMinutes() + api_check_time );
        $.cookie('api_check_pre_time', api_expires, { expires : api_expires, path : '/' });
        console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_expires+'.\nCookie is updated.');
        
        // cookie check
        if(ADD_setup_Client_ID.length >= 30)
           console.log('There is twitch client id', ADD_setup_Client_ID.length);
        else
           console.log('There is no twitch client id', ADD_setup_Client_ID.length);
        
        if ((!!$.cookie('api_check_pre_time')) && (!!$.cookie('ADD_setup_Ary')) && (ADD_setup_Client_ID.length >= 30) ) 
        {   
            console.log('All cookie checked for api');
            // make channel id ary for api
            var possibleChannels = [];    
            if(ADD_setup_top_off_fix && ADD_setup_alarm)
                possibleChannels = concatArraysUniqueWithSort(fixed_streamer, alarm_streamer);
            else if(ADD_setup_top_off_fix)
                possibleChannels = fixed_streamer;
            else if(alarm_streamer)
                possibleChannels = alarm_streamer;

            console.log('Api call channels no. :'+possibleChannels.length);
            if(possibleChannels.length > 0)
            {
                console.log('Api call channels name : '+possibleChannels);     
                
                possibleChannels.forEach(function(api_name){
                    $.ajax({ 
                         url:'https://api.twitch.tv/kraken/streams/'+api_name,
                         type: 'GET',
                         contentType: 'application/json',
                         dataType:'json',
                         headers: {
                           'Client-ID': ADD_setup_Client_ID
                         },
                         success:function(channel) {
                              //request succeeded
                              console.log('api request succeeded', channel);
                              if (channel["stream"] == null) {
                                  console.log(api_name+' is offline');
                              } 
                              else {
                                  console.log(api_name+' is online');
                              }

                         },
                         error:function() {
                              // request failed
                              console.log('api request failed');
                         }
                    });
                });
                /*
                possibleChannels.forEach(function(api_name){
                $.getJSON('https://api.twitch.tv/kraken/streams/' + api_name + '?callback=?', 
                    function(channel){
                        //console.log(channel);
                        if (channel["stream"] == null) {
                            console.log(api_name+' is offline');
                            // $('#all').append('<p>' + channel._links.self + '</p>');
                        } 
                        else {
                            console.log(api_name+' is online');
                            //$('#all').append('<p>Fail</p>');   
                        }
                    });
                });*/
            }
            
        }
        
    }
    else
    {
        // not update
        left_time = Math.floor(left_time/60/1000)+' min '+Math.floor((left_time/1000)%60)+' sec';
        console.log('Current time is '+now_time+'.\nCookie time for api update is '+api_pre_time+'.\nCookie is not updated.\nCookie will update after '+left_time);
    }
    
}

twitch_api();

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// setup popup DOE

$('.container').append('\
    <div style="position:relative;">\
        <div class="AD_title">\
           <span id="ADD_setup" class="btn btn-default btn_closed">\
              <span class="glyphicon glyphicon-cog">\
              </span>\
           </span>\
        </div>\
        \
        <div id="popup_ADD_setup" class="modal-dialog">\
           <div class="modal-content">\
              <div class="modal-body">\
                 <table class="table table-striped table-hover">\
                     <thead><tr><th>ADDostram version: '+version+'</th><th></th></tr></thead>\
                     <tbody>\
                        <tr>\
                           <td>특정 스트리머 상단 고정</td>\
                           <td><input type="checkbox" id="ADD_setup_top_fix" onfocus="this.blur()"  /></td>\
                        </tr>\
                        <tr style="display:none;">\
                           <td>└ 오프라인 시에도 고정 <strong style="color:red;">(Client ID 요구됨)</strong></td>\
                           <td><input type="checkbox" id="ADD_setup_top_off_fix" onfocus="this.blur()" class="form_enabled" /></td>\
                        </tr>\
                        <tr>\
                           <td>└ 상단 고정 스트리머 아이디(콤마로 구분)</td>\
                           <td><input type="text" id="ADD_setup_top_fix_ID" class="form_enabled" /></td>\
                        </tr>\
                        <tr style="display:none;">\
                           <td>스트리머 Online 알림 <strong style="color:red;">(Client ID 요구됨)</strong></td>\
                           <td><input type="checkbox" id="ADD_setup_alarm" onfocus="this.blur()"  /></td>\
                        </tr>\
                        <tr style="display:none;">\
                           <td>└ 스트리머 알림 시간 간격(최소 1분)</td>\
                           <td><input type="text" id="ADD_setup_alarm_gap" class="form_enabled" /></td>\
                        </tr>\
                        <tr style="display:none;">\
                           <td>└ 스트리머 알림 대상 아이디(콤마로 구분)</td>\
                           <td><input type="text" id="ADD_setup_top_alarm_ID" class="form_enabled" /></td>\
                        </tr>\
                        <tr style="display:none;">\
                           <td><strong style="color:red;">Twitch Client ID</strong> <a href="https://www.twitch.tv/kraken/oauth2/clients/new" target="_blank">[발급 링크]</a></td>\
                           <td><input type="text" id="ADD_setup_Client_ID" class="form_enabled" /></td>\
                        </tr>\
                    </tbody>\
                 </table>\
              </div>\
              <div class="modal-footer">\
                <!--<div class="glyphicon glyphicon-ok bg-success" style="display:block;float:left;height:30px; width:100%;padding:7px 0px;">Saved successfully!</div>-->\
                <div id="ADD_setup_Success" class="btn btn-success confirm_selection" style="display:none;">Done!<br /> 변경사항은 새로고침 후 적용됩니다.</div>\
                  <button type="button" id="Cookie_reset" class="btn">Cookie reset</button>\
                  <button type="button" id="ADD_setup_save" class="btn btn-primary">Save changes</button>\
              </div>\
           </div>\
        </div>\
        \
    </div>\
');

// write setup form from cookie
cookie_applied_to_setup();

// form contents initialize
if(!ADD_setup_top_fix)
{
    $('#ADD_setup_top_off_fix, #ADD_setup_top_fix_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    //$('#ADD_setup_top_fix_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
}

if(!ADD_setup_alarm)
{
    $('#ADD_setup_alarm_gap, #ADD_setup_top_alarm_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    //$('#ADD_setup_top_alarm_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
}

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// form click event
$('#ADD_setup_top_fix').on('click', function() {
    if($('#ADD_setup_top_fix').is(':checked'))
    {
        $('#ADD_setup_top_off_fix, #ADD_setup_top_fix_ID').prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
        //$('#ADD_setup_top_fix_ID').prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
    }
    else
    {
        $('#ADD_setup_top_off_fix, #ADD_setup_top_fix_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
        //$('#ADD_setup_top_fix_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    }
});

$('#ADD_setup_alarm').on('click', function() {
    if($('#ADD_setup_alarm').is(':checked'))
    {
        $('#ADD_setup_alarm_gap, #ADD_setup_top_alarm_ID').prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
        //$('#ADD_setup_top_alarm_ID').prop('disabled', false).addClass('form_enabled').removeClass('form_disabled');
    }
    else
    {
        $('#ADD_setup_alarm_gap, #ADD_setup_top_alarm_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
        //$('#ADD_setup_top_alarm_ID').prop('disabled', true).addClass('form_disabled').removeClass('form_enabled');
    }
});

//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
// setup popup On-Off script

$('#ADD_setup').on('click', function() {
    if ($('#ADD_setup').hasClass('btn_closed'))
    {
        $('#popup_ADD_setup').stop(true,true).fadeIn(300);
        $('#ADD_setup').removeClass('btn_closed').addClass('btn_opend');
        // alert('OPEN');
    }
    else
    {
        $('#popup_ADD_setup').stop(true,true).fadeOut(300);
        $('#ADD_setup').removeClass('btn_opend').addClass('btn_closed');
        // alert('CLOSE');
    }    
//    return false;
});

$('a.nav-brand, #stream').on('click', function() {
    if ($('#ADD_setup').hasClass('btn_opend'))
    {
        $('#popup_ADD_setup').stop(true,true).fadeOut(300);
        $('#ADD_setup').removeClass('btn_opend').addClass('btn_closed');
        // alert('CLOSE');
    }
});


//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
// Save setup to cookie (Click event)

function save_setup_to_cookie()
{
    if (typeof ADD_setup_Ary === 'undefined')
    {
        // ADD_setup_Ary doesn't exist, initialize ADD_setup_Ary
        cookie_initialize();
    }
        
    ADD_setup_Ary[0] = $('#ADD_setup_top_fix').prop('checked');
    ADD_setup_Ary[1] = $('#ADD_setup_top_off_fix').prop('checked');
    ADD_setup_Ary[2] = $('#ADD_setup_top_fix_ID').val();
    ADD_setup_Ary[3] = $('#ADD_setup_alarm').prop('checked');
    ADD_setup_Ary[4] = $('#ADD_setup_alarm_gap').val();
    ADD_setup_Ary[5] = $('#ADD_setup_top_alarm_ID').val();
    ADD_setup_Ary[6] = $('#ADD_setup_Client_ID').val();
    
    $.cookie('ADD_setup_Ary', JSON.stringify(ADD_setup_Ary), { expires : 365*2, path : '/' }); // write cookie ary
}

$('#ADD_setup_save').on('click', function() {
    save_setup_to_cookie();
    cookie_to_variable();
    $('#ADD_setup_Success').fadeIn('1000').delay('3000').fadeOut('1000');
    
});

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////
// reset cookie

$('#Cookie_reset').on('click', function() {
    cookie_initialize();
    cookie_setup_remove();
    setup_cookie();
    cookie_applied_to_setup();
    cookie_to_variable();
    $('#ADD_setup_Success').fadeIn('1000').delay('3000').fadeOut('1000');
    console.log('cookie reset!')
});


//////////////////////////////////////////////////////////////////////////////////


$(document).on("click", "#multitwitch", multitwitch_run);

$(document).ready(function(){
    setTimeout(
        function() {
            // alert('CHECK.');
            Addostram_run();
        },
        500);
});

$('.container>a').click(function(){
    setTimeout(
        function() {
            // alert('CHECK.');
            Addostram_run();
        },
        200);
});

function Addostram_run()
{
    // Add multitwitch button
    if( $('#multitwitch').length === 0 )
          $('.search').append('<span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span>');

    // Fix choosed streamer on top
    console.log('Streamer fixed: ', ADD_setup_top_fix);
    if ((!!$.cookie('ADD_setup_Ary')) && ADD_setup_top_fix && fixed_streamer.length >= 1){
        $('li.twitch').each(function (j) {
            href = $(this).find('a').attr('href').replace('/#/stream/twitch/', '');
            $(this).attr('id', 'twitch_'+ href);
        });
        
        for(k = 0; k < fixed_streamer.length; k++){
            temp_streamer_id = '#'+'twitch_'+fixed_streamer[fixed_streamer.length - k - 1];
            if(!($(temp_streamer_id).length === 0))
            {
                $(temp_streamer_id).addClass('fixed_streamer').prependTo('.main-streams>ul');
                $(temp_streamer_id).prepend('<div style="position:relative;"><div class="glyphicon glyphicon-pushpin" style="position:absolute;top:10px; right:10px;"><div><div>');
            }
        }
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
        $(this).append('<div style="position:relative;"><div style="position:absolute; top:-40px; right:75px; text-align:center; font-size:12px; z-index:100; margin:0;"><input style="margin-right:5px;border:none !important;" type="checkbox" name="chk" value="'+href+'" onfocus="this.blur()" /><div style="background-color:#eee; padding:5px 8px; height:15; display:inline;"><a href="/#/stream/multitwitch/'+href+'">With chat</a></div></div></div>');
        streamerID = ''; // reset
});
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
