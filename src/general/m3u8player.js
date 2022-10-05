import {ADD_DEBUG} from "libs/nomo-utils.js";
import {loadhls} from "libs/hls_custom.js";
import {ADD_send_sys_msg_from_main_frame} from "chat/send_message.js";

var m3u8_player = /*js*/`
<video controls="true" width="100%" height="100%" id="m3u8video"></video>
`;

async function loadHlsVideo(url, iter){
    ADD_DEBUG("loadHlsVideo", url, iter);
    if(iter > 20){
        ADD_DEBUG("loadHlsVideo, MAX ITER");
        return;
    }
    if(newHls === undefined){
        setTimeout(function(){
            loadHlsVideo(url, iter+1);
        },100);
        return;
    }

    var $video = $("#m3u8video");
    var video;
    var m3u8Url = decodeURIComponent(url);

    if($video.length === 0){
        $("#stream").empty().append(m3u8_player);
        $video = $("#m3u8video");
    }

    video = $video[0];

    if (newHls.isSupported()) {
        ADD_DEBUG("newHls.isSupported = true", video);
        var newhls = new newHls();
        newhls.loadSource(m3u8Url);
        newhls.attachMedia(video);
        newhls.on(newHls.Events.MANIFEST_PARSED, function() {
            ADD_DEBUG("newHls.Events.MANIFEST_PARSED", video);
            video.play();
        });
        newhls.on(newHls.Events.ERROR, function(event, data) {
            var errorFatal = data.fatal;
            if(errorFatal){
                var errorType = data.type;
                var errorDetails = data.details;
                ADD_DEBUG("FAIL TO LOAD HLS", event, data);
                ADD_send_sys_msg_from_main_frame(`M3U8 PLAYER 재생 중 치명적인 오류가 발생했습니다. Error Type:${errorType}, Error Details:${errorDetails}${(data.response !== undefined && data.response.code !== undefined) ? ", Network Status:"+data.response.code : ""}`);
    
                newhls.destroy();
            }
            else{
                ADD_DEBUG("newHls.Events.ERROR", event, data);
            }
            // switch (data.type) {
            // case newHls.ErrorTypes.NETWORK_ERROR:
            //     // try to recover network error
            //     console.log('fatal network error encountered, try to recover');
            //     newhls.startLoad();
            //     break;
            // case newHls.ErrorTypes.MEDIA_ERROR:
            //     console.log('fatal media error encountered, try to recover');
            //     newhls.recoverMediaError();
            //     break;
            // default:
            //     // cannot recover
            //     newhls.destroy();
            //     break;
            // }
        });
    }
    else{
        ADD_DEBUG("newHls.isSupported = FAIL");
    }

    // if (Hls.isSupported()) {
    //     var hls = new Hls();
    //     hls.loadSource(m3u8Url);
    //     hls.attachMedia(video);
    //     hls.on(Hls.Events.MANIFEST_PARSED, function() {
    //         video.play();
    //     });
    //     hls.on(Hls.Events.ERROR, function(){
    //         NOMO_DEBUG("Hls ERROR");
    //         // if(newHls === undefined){
    //         //     loadhls();
    //         // }
    //         // var newhls = new newHls();
    //         // newhls.loadSource(m3u8Url);
    //         // newhls.attachMedia(video);
    //         // newhls.on(newHls.Events.MANIFEST_PARSED, function() {
    //         //     video.play();
    //         // });
    //     });
    // }
}

export function m3u8_override(url){
    ADD_DEBUG("m3u8_override", url);
    var waiting_time = 1000;

    // if($("#headerm3u8").length === 0){
    //     // <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    //     $("head").append(`
    //         <script id="headerm3u8" src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    //     `);   
    // }
    // else{
    //     waiting_time = 1000;
    // }

    if(window.newHls === undefined){
        loadhls();
    }

    $('header').addClass("onstream");
    $('#stream').addClass("onstream");
    $('.footer').hide();
    $("#stream").empty().append(m3u8_player);

    setTimeout(function(){
        loadHlsVideo(url, 0);
    },waiting_time);
}