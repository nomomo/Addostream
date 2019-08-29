////////////////////////////////// UNIQUE WINDOW /////////////////////////////////
// 다중창 체크하여 Twitch api 호출 막음
function ADD_multiwindow_prevent(){
    nomo_global.unique_window = new Date();
    nomo_global.unique_window = Number(nomo_global.unique_window.getTime());
    $.cookie("unique_window", nomo_global.unique_window, { expires : 30, path : "/" });

    /*
    setInterval(function(){
        unique_window_cookie = Number($.cookie("unique_window"));
        if((unique_window_check === true)&&(unique_window != unique_window_cookie)){
            ADD_DEBUG("unique window = ",unique_window);
            ADD_DEBUG("unique window cookie is ",unique_window_cookie);
            unique_window_check = false;
            $("#notice_text").show().addClass("ADD_twitch_api_again").html("(+) 새 창에서 접속 감지 됨. 현재 창에서 다시 시작하려면 클릭.").on("click", function(){
                ADD_twitch_api_again(ONLY_STREAM);
            });
            $("#notice_text2").show().addClass("ADD_twitch_api_again_with_chat").html("[채팅까지 다시시작]").on("click", function(){
                ADD_twitch_api_again(WITH_CHAT);
            });
            $("#notice_text_elem").show();
            clearInterval(ADD_API_SET_INTERVAL);
        }
    }, 1000);
    */
}