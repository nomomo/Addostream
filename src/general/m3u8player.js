export function m3u8_override(url){
    var waiting_time = 1000;
    if($("#headerm3u8").length === 0){
        $("head").append(`
            <script id="headerm3u8" src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        `);
    }
    else{
        waiting_time = 1000;
    }
    $("#stream").empty();
    var m3u8_player = `
    <video controls="true" width="100%" height="100%" id="m3u8video"></video>
    <script>
    var video = document.getElementById('m3u8video');
    var videoSrc = '${url}';
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', function() {
        video.play();
        });
    }
    </script>
    `;
    setTimeout(function(){
        $('header').addClass("onstream");
        $('#stream').addClass("onstream");
        $('.footer').hide();
        $("#stream").empty().append(m3u8_player);
    },waiting_time);
}