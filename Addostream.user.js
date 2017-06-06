// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1.03
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

var streamerArray = [
    ['hanryang1125','풍월량'],
    ['ddahyoni','따효니'],
    ['kss7749','쉐리'],
    ['looksam','룩삼'],
    ['saddummy','서새봄냥'],
    ['109ace','철면수심'],
    ['rhdgurwns','공혁준'],
    ['gmdkdsla','흐앙님'],
    ['jungtaejune','똘똘똘이'],
    ['mascahs','마스카'],
    ['steelohs','스틸로'],
    ['kimdoe','김도'],
    ['togom','토곰'],
    ['ogn_lol','OGN 롤챔스']    
    ];
var ADD_title = '1.03';
var href = 'initialize';
var streamerID = '';
var multitwitchID = 'hanryang1125';

$(document).on("click", "#multitwitch", multitwitch_run);
$('.container').append('<div style="height=63px;padding:25px 0;font-size:11px;font-style:italic;color:#999;">'+ADD_title+'</div>');

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
    if( $('#multitwitch').length === 0 )
          $('.search').append('<span id="multitwitch" style="cursor: pointer; display:inline-block; font-size:12px; line-height:20px; margin:0 5px 0 0; padding: 5px 10px; background: #eee none repeat scroll 0 0; color: #222;">멀티트위치</span>');
    $('li.twitch').each(function (i) {
    href = $(this).find('a').attr('href');
    href = href.replace('/#/stream/twitch/', '');
    for(var i=0; i < streamerArray.length; i++){
    if (href==streamerArray[i][0])
        {
            streamerID=streamerArray[i][1]+' ';
            break;
        }
    }
    $(this).find('.info>.from').html(streamerID+'('+href+')');
    $(this).append('<div style="position:relative;"><div style="position:absolute; top:-40px; right:75px; text-align:center; font-size:12px; z-index:1000000; margin:0;"><input style="margin-right:5px;border:none !important;" type="checkbox" name="chk" value="'+href+'" onfocus="this.blur()" /><div style="background-color:#eee; padding:5px 8px; height:15; display:inline;"><a href="/#/stream/multitwitch/'+href+'">With chat</a></div></div></div>');
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
