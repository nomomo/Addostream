// ==UserScript==
// @name        Addostream
// @namespace   Addostream
// @description 두스트림에 기능을 추가한다.
// @include     http://*.dostream.com/*
// @version     1
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
    ['109ace','철면수심']
    ];
var ADD_title = 'Twitch ID Checker v170527_002';
var href = 'initialize';
var streamerID = '';

$('.container').append('<div style="height=63px;padding:30px 0;font-size:11px;font-style:italic;color:#999;">'+ADD_title+'</div>');

$(window).load(function(){
    Addostram_run();
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
    streamerID = ''; // reset
});
}